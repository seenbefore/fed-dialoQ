import { merge, toPath } from 'lodash'
import { runBooleanOrFunction } from './utils'

export type IRenderType = any | JSX.Element | (() => IRenderType)

export type IFunction = (...args: any) => any

export type ICallBack<T> = T | ((...args: any) => T)

export type IOnEvent = {
    on?: {
        click?: IFunction
    }
}

export interface IStyleKey {
    class?: ICallBack<string>
    style?: ICallBack<string | Partial<CSSStyleDeclaration>>
}

export interface IFormColumns {
    /* 对于model中定义的key */
    prop?: string
    /* 显示的文本 */
    label?: IRenderType
    /* 渲染函数 */
    render?: IRenderType
    /* 默认值 */
    defaultValue?: any
    /* 是否隐藏 */
    hidden?: boolean | (() => boolean)
    /* 空的时候展示的值，默认为 - */
    emptyValue?: ICallBack<string>
}

export interface IFormConfig {
    /* 占比 */
    gutterSpan?: number
    /* 空的时候展示的值，默认为 - */
    emptyValue?: ICallBack<string>
}

export abstract class AbstractFormBuilder<T extends Obj = Obj, K extends IFormColumns = IFormColumns> {
    public abstract config: IFormConfig

    protected constructor(config?: IFormConfig, columns?: Array<K>) {
        this.initConfig(config)
            .initColumns(columns)
            .initModelValue()
    }

    public columns: Array<K> = []

    /* 数据存储的model */
    public model: T = {} as T

    public get showColumns(): Array<K> {
        return this.columns.filter(it => !runBooleanOrFunction(it.hidden))
    }

    public initConfig<U extends AbstractFormBuilder<T, K> = AbstractFormBuilder<T, K>>(config?: IFormConfig): U {
        config && merge(this.config, config)
        return (this as unknown) as U
    }

    public initColumns<U extends AbstractFormBuilder<T, K> = AbstractFormBuilder<T, K>>(columns?: Array<K>): U {
        if (columns) {
            this.columns = columns
        }
        return (this as unknown) as U
    }

    public initModelValue<U extends AbstractFormBuilder<T, K> = AbstractFormBuilder<T, K>>(): U {
        const length = this.columns.length
        for (let i = 0; i < length; ++i) {
            const { prop, defaultValue } = this.columns[i]
            prop && this.updateValue(prop, defaultValue ?? void 0)
        }
        return (this as unknown) as U
    }

    /**
     * 设置值
     * @param obj
     * @param key
     * @param value
     */
    public set<V extends Obj, U extends AbstractFormBuilder<T, K> = AbstractFormBuilder<T, K>>(obj: V, key: keyof V | string, value: any): U {
        const paths = toPath(key)
        if (paths.length > 1) {
            const [first, ...rest] = paths
            if (!Reflect.has(obj, first)) {
                this.set(obj, first, {})
            }
            return this.set(Reflect.get(obj, first), rest.join('.'), value)
        } else {
            this.updateValue(key as string, value, obj)
        }
        return (this as unknown) as U
    }

    /**
     * 构建model
     * @param model
     */
    public buildModel<U extends AbstractFormBuilder<T, K> = AbstractFormBuilder<T, K>>(model: T): U {
        this.model = model
        return (this as unknown) as U
    }

    public abstract updateValue(key: keyof T | string, value: any, obj?: T | Obj): AbstractFormBuilder<T, K>
}
