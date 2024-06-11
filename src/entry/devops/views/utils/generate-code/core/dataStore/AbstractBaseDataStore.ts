import { AbstractBaseModel } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseModel'
import { InjectApp } from '@/entry/devops/views/utils/generate-code/core/utils'
import { assign, get, toPath } from 'lodash'
import { Vue } from 'vue-property-decorator'

export interface IComponentList {
    label: string
    icon: string
    type: string
    isContainer?: boolean
}

export interface IModelAttr {
    type: string | 'input' | 'textarea' | 'select' | 'switch' | 'editor'
    path: string
    label: string
    options?: Array<{ label: string; value: string } | string>
}

/**
 * K: config
 * U: model properties
 * T: model
 */
export abstract class AbstractBaseDataStore<K extends Obj, U extends Obj, T extends AbstractBaseModel<U>> extends InjectApp {
    /* 表单自己的配置项 */
    public abstract config: K

    /**
     * 创建模块
     * @param type
     * @param properties
     * @param parent
     * @param args
     */
    public abstract createModel(type: string, properties?: Partial<U>, parent?: AbstractBaseModel<U>, ...args: any): T

    /**
     * 代码生成
     */
    public abstract generate(...args: any): void

    /* 获取对应的attr */
    public abstract getAttr(type: string): Array<IModelAttr>

    /* 获取组件列表 */
    public abstract getComponentList(): Array<IComponentList>

    /* 校验是否可以添加 */
    public abstract getValidateMessage(...args: any): UndefinedAble<string>

    /* 复制控件 */
    public abstract copyModelIntoActiveModel(data: AbstractBaseModel<U>): void

    /* 存储所有的数据 */
    public data: Array<T> = []

    /* 当前激活的模块 */
    public activeModel: UndefinedAble<T> = void 0

    /* 更新激活的模块 */
    public updateActiveModel(item?: T): UndefinedAble<T> {
        this.activeModel = item
        return this.activeModel
    }

    /* 根据id查找模块的下标 */
    public findIndex(id: number): number {
        return this.data.findIndex(it => it.id === id)
    }

    /* 根据id查找模块 */
    public findById(id: number): UndefinedAble<T> {
        return this.find(it => it.id === id)
    }

    /* 根据domId查找模块数据 */
    public findByDomId(domId: string): UndefinedAble<T> {
        return this.find(it => it.domId === domId)
    }

    /* 查找模块 */
    public find(callBack: (item: AbstractBaseModel<U>) => boolean): UndefinedAble<T> {
        const length = this.data.length
        let result: UndefinedAble<T> = void 0
        for (let i = 0; i < length; ++i) {
            const data = this.data[i]
            data.recursive(callBack, res => {
                result = res as UndefinedAble<T>
            })
        }
        return result
    }

    public getDataIndex(id: number): number {
        return this.data.findIndex(it => it.id === id)
    }

    public insert(model: T, index: number): T {
        if (model.parent) {
            model.parent.insert(model, index)
        } else {
            this.data.splice(index, 0, model)
        }
        return model
    }

    /**
     * 添加模块
     * @returns
     * @param model
     */
    public push(model: T): T {
        if (model.parent) {
            return model.parent.push<T>(model)
        }
        this.data.push(model)
        return model
    }

    /* 删除模块 */
    public delete(id: number): UndefinedAble<T> {
        const findModel = this.findById(id)
        if (findModel?.parent) {
            findModel.parent.delete(findModel)
        } else {
            const index = this.data.findIndex(it => it.id === id)
            if (index !== -1) {
                this.data[index].isDelete = true
                this.data.splice(index, 1)
            }
        }
        return findModel
    }

    /**
     * 设置值
     * @param obj
     * @param key
     * @param value
     */
    public set<V extends Obj>(obj: V, key: keyof V | string, value: any): AbstractBaseDataStore<K, U, T> {
        const paths = toPath(key)
        if (paths.length > 1) {
            const [first, ...rest] = paths
            if (!Reflect.has(obj, first)) {
                this.set(obj, first, {})
            }
            return this.set(Reflect.get(obj, first), rest.join('.'), value)
        } else {
            this.updateValue(obj, key, value)
        }
        return this
    }

    /**
     * 获取值
     * @param obj
     * @param key
     */
    public get<V extends Obj>(obj: V, key: keyof V | string | Array<keyof V | string>): any {
        return get(obj, toPath(key))
    }

    /**
     * 默认使用 Vue.set 方法修改值。子类可修改修改的源方法。
     * @param obj
     * @param key
     * @param value
     */
    public updateValue<V extends Obj>(obj: V, key: keyof V | string, value: any): AbstractBaseDataStore<K, U, T> {
        /* set 不兼容 symbol */
        Vue.set(obj, key as string, value)
        return this
    }

    /* 获取下一个激活的的模块 */
    public getNextActiveModel(model: AbstractBaseModel<U>): UndefinedAble<AbstractBaseModel<U>> {
        if (model.parent) {
            const findParent = this.findById(model.parent.id)
            if (findParent) {
                return findParent
            }
            return this.data[0]
        } else {
            const currentIndex = this.data.findIndex(it => model.id === it.id)
            return this.data[currentIndex - 1] || this.data[currentIndex + 1]
        }
    }

    /* 修改配置 */
    public updateConfig(config: K): void {
        assign(this.config, config)
    }

    public clear(): void {
        this.data = []
        this.activeModel = void 0
    }
}
