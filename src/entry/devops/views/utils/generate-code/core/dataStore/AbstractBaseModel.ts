import { createUUID, InjectApp, useUnEnumerable } from '@/entry/devops/views/utils/generate-code/core/utils'

type Callback<T> = (c: AbstractBaseModel<T>) => boolean

export abstract class AbstractBaseModel<T = Obj> extends InjectApp {
    /* 子节点 */
    public abstract children: Array<AbstractBaseModel<T>>

    /**
     * 代码生成
     */
    public abstract generate(...args: any): any

    public abstract generateForDataKey(data: Obj): Obj

    public isDelete = false

    /* 模型唯一标识 */
    public id: number

    /* 属性 */
    public abstract properties: T

    /**
     * 在渲染的时候生成到dom上的id
     */
    public get domId() {
        return `id_${this.id}`
    }

    public get label(): string {
        // @ts-ignore
        return Reflect.get(this.properties, 'label') ?? ''
    }

    protected constructor(public type: string, public parent?: AbstractBaseModel<T>) {
        super()
        this.id = createUUID()
        useUnEnumerable(this, 'parent')
    }

    /**
     * 递归查找
     * @param callback 条件回调
     * @param resultBack 符合条件的控件执行的回调
     */
    public recursive(callback: Callback<T>, resultBack: (c: AbstractBaseModel<T>) => void): void {
        callback(this) ? resultBack(this) : this.children.forEach((c: AbstractBaseModel<T>) => c.recursive(callback, resultBack))
    }

    /* 添加模块 */
    public push<U extends AbstractBaseModel<T>>(model: AbstractBaseModel<T>): U {
        this.children.push(model)
        return model as U
    }

    /* 插入模块 */
    public insert<U extends AbstractBaseModel<T>>(model: AbstractBaseModel<T>, index: number): U {
        this.children.splice(index, 0, model)
        return model as U
    }

    /* 删除模块 */
    public delete(model: AbstractBaseModel<T>): AbstractBaseModel<T> {
        const index = this.children.findIndex(it => it.id === model.id)
        if (index !== -1) {
            this.children[index].isDelete = true
            this.children.splice(index, 1)
        }
        return model
    }

    /**
     * 根据id查找
     * @param id
     */
    public findById<U extends AbstractBaseModel<T>>(id: number): UndefinedAble<U> {
        let result: AbstractBaseModel<T> | undefined
        this.recursive(
            it => it.id === id,
            res => (result = res),
        )
        return result as UndefinedAble<U>
    }

    /* 根据domId查找模块数据 */
    public findByDomId<U extends AbstractBaseModel<T>>(domId: string): UndefinedAble<U> {
        let result: AbstractBaseModel<T> | undefined
        this.recursive(
            it => it.domId === domId,
            res => (result = res),
        )
        return result as UndefinedAble<U>
    }

    public getChildrenIndex(id: number): number {
        return this.children.findIndex(it => it.id === id)
    }
}
