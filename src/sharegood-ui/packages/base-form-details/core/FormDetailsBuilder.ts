import { createUUID } from '@/sharegood-ui/packages/base-form-details/core/utils/isGren'
import { Col, Row } from 'element-ui'
import { get, isFunction, toPath } from 'lodash'
import Vue from 'vue'
import BaseFormDetails from '../index.vue'
import { AbstractFormBuilder, ICallBack, IFormColumns, IFormConfig, IOnEvent, IStyleKey } from './index'
import { IDescriptionsItemProps, IDescriptionsProps } from './utils/type'

export interface IFormDetailsColumns extends IFormColumns, IStyleKey, IOnEvent {
    /* 为了处理重复prop的问题 */
    id?: number | string
    /* el-col参数 */
    elColProps?: ICallBack<Partial<Col> & IStyleKey>
    /* el-descriptions参数 */
    elDescriptionProps?: ICallBack<Partial<IDescriptionsProps & IStyleKey>>
    /* el-descriptions-item参数 */
    elDescriptionItemProps?: ICallBack<Partial<IDescriptionsItemProps & IStyleKey>>
    /* 文字的class */
    labelClassName?: ICallBack<IStyleKey['class']>
    /* 文字的style */
    labelStyle?: ICallBack<IStyleKey['style']>
    /* 内容的class */
    contentClassName?: ICallBack<IStyleKey['class']>
    /* 内容的style */
    contentStyle?: ICallBack<IStyleKey['style']>
    /* label的suffix */
    labelSuffix?: string
    /* title */
    title?: ICallBack<string>
    /* 占几格 */
    span?: ICallBack<number | string>
    /* labelWidth */
    labelWidth?: ICallBack<string>
    /* dataId */
    dataId?: number | string
    /* hasAutoMargin */
    hasAutoMargin?: boolean
}

export interface IFormDetailsBuilderConfig extends IFormConfig {
    /* el-row参数 */
    elRowProps?: ICallBack<Partial<Row> & IStyleKey>
    /* label的后缀：默认是 ： */
    labelSuffix?: string
    /* labelWidth */
    labelWidth?: ICallBack<string>
}

export class FormDetailsBuilder<T extends Obj = Obj> extends AbstractFormBuilder<T, IFormDetailsColumns> {
    /* 配置参数 */
    public config: IFormDetailsBuilderConfig = {
        /* 默认占6格 */
        gutterSpan: 12,
        elRowProps: {
            /* 默认向右 */
            justify: 'start',
        },
        labelSuffix: '：',
        emptyValue: '-',
    }

    public formRef?: BaseFormDetails

    constructor(config?: IFormDetailsBuilderConfig, columns?: Array<IFormDetailsColumns>) {
        super(config, columns)
    }

    /**
     * 解析config
     * @param config
     * @private
     */
    private parseConfig(config?: IFormDetailsBuilderConfig): UndefinedAble<IFormDetailsBuilderConfig> {
        return config ?? this.config
    }

    /**
     * 解析columns
     * @param columns
     * @private
     */
    private parseColumns(columns?: Array<IFormDetailsColumns>): UndefinedAble<Array<IFormDetailsColumns>> {
        if (columns) {
            const length = columns.length,
                propsList: Array<string> = []
            let titleCount = 0
            for (let i = 0; i < length; i++) {
                const column = columns[i]
                /* 给列加一个标识 */
                !column.id && this.set(column, 'id', createUUID())
                const { prop } = column
                if (prop) {
                    if (propsList.includes(prop)) {
                        console.error(`${prop} be repeated ！`)
                    }
                    propsList.push(prop)
                }
                const keys = Object.keys(column) as Array<keyof IFormDetailsColumns>
                /* 只有一个title，没有prop，没有label和render，则认为是一个标题，让他自动占一行 */
                const propKes: Array<keyof IFormDetailsColumns> = ['prop', 'label', 'render']
                const hasTitle = keys.includes('title')
                if ((keys.length === 1 && hasTitle) || (keys.some(key => !propKes.includes(key)) && hasTitle)) {
                    this.set(column, 'span', 24)
                    /* 除了第一个标题，后续的标题需要加一个margin-top */
                    if ((++titleCount > 1 && !column.elDescriptionProps) || (!isFunction(column.elDescriptionProps) && column.elDescriptionProps?.style)) {
                        this.set(column, 'elDescriptionProps', { style: 'margin-top: 8px;' })
                        this.set(column, 'hasAutoMargin', true)
                    }
                }
            }
        }
        return columns
    }

    public init(columns: Array<IFormDetailsColumns>, config?: IFormDetailsBuilderConfig): FormDetailsBuilder<T> {
        return this.initConfig(this.parseConfig(config))
            .initColumns(this.parseColumns(columns))
            .initModelValue<FormDetailsBuilder<T>>()
    }

    /**
     * 初始化formRef，指向表单实例
     * @param formRef
     */
    public initFormRef(formRef: BaseFormDetails): FormDetailsBuilder<T> {
        this.formRef = formRef
        return this
    }

    public updateValue(key: keyof T, value: any, obj = this.model): FormDetailsBuilder<T> {
        /* Vue.set key 类型不兼容 symbol */
        Vue.set(obj as Obj, key as string | number, value)
        return this
    }

    /**
     * 根据key获取值，支持通过a.b.c方式获取
     * @param key
     */
    public getValue(key: keyof T): any {
        return get(this.model, toPath(key))
    }
}
