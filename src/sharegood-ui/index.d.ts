import Vue, { CreateElement } from 'vue'

interface Rule {
    trigger?: string
    validator?: (rule: any, value: any, callback: (msg?: any) => void) => void
    message?: string
    [propName: string]: any
}
type FC = () => void
export type FormFieldTag =
    | 'text'
    | 'input'
    | 'select'
    | 'date'
    | 'time'
    | 'checkbox'
    | 'radio'
    | 'cascader'
    | 'uploader'
    | 'autocomplete'
    | 'range'
    | 'action'
    | 'slot'
    | 'custom'
    | 'switch'
    | 'daterange'
    | 'input-number'
    | FC

interface inputSlot {
    slotType?: string
    slotName?: string
}

interface optionType {
    /**字段名称 */
    name?: string
    /**
     * option 值
     */
    value?: any
    label?: any
    option?: any
}
interface onChange {
    (
        params: optionType,
        opt: {
            schema: FormColumn
            //tableAction: any
            formActionType: FormRef
            formModel: Recordable
        },
    ): void
}
interface CallbackFn {
    (valid: boolean, errors: any[]): void
}

interface FormFieldButton {
    isSubmit?: boolean
    isReset?: boolean
    type?: string
    text: string
    [propName: string]: any
}

export interface Render {
    (
        h: CreateElement,
        column: {
            /**
             * 数据
             */
            row: any
            [propName: string]: any
        },
    ): any
}
export { CreateElement }
interface ComponentPropsOption {
    label: any
    value: any
    [propName: string]: any
}
export interface ComponentProps {
    value?: any
    multiple?: boolean
    filterable?: boolean
    clearable?: boolean
    options?: ComponentPropsOption[] | ((formModal: Record<string, any>, params: any) => void)
    placeholder?: string
    inputSlots?: inputSlot[]
    appendSlot?: string
    prependSlot?: string
    autocompleteSlot?: string
    disabled?: boolean
    /**
     * 设置全选值 全部
     */
    selectAllValue?: string

    selectRender?: Render
    defaultSlotRender?: Render
    inputAppendSlotRender?: Render | string
    inputPrependSlotRender?: Render | string
    inputPrefixSlotRender?: Render | string
    inputSuffixSlotRender?: Render | string
    appendSlotRender?: Render | string
    listeners?: any
    /**
     * 数据变化回调函数
     */
    onChange?: onChange
    onInput?: (
        val: any,
        opt: {
            name: string
            label: string
            schema: FormColumn
            //tableAction: any
            formActionType: FormRef
            formModel: Recordable
        },
    ) => void
    [propName: string]: any
}
export interface FormColumn {
    class?: string
    span?: number
    offset?: number
    /**栅格向右移动格数 */
    push?: number
    pull?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    /**
     * 可选值： | 'text'| 'input'| 'select'| 'date'| 'time'| 'checkbox'| 'radio'| 'cascader'| 'uploader'| 'autocomplete'| 'range'| 'action'| 'slot'| 'custom'| 'switch'
     */
    tag?: FormFieldTag
    custom?: any
    name?: string
    visible?: boolean
    itemAttrs?: {
        /**
         * 提示语
         */
        helpMessage?: string
        /**
         * 表单域标签的的宽度，例如 '50px'。支持 auto。
         */
        labelWidth?: string
        label?: string
        rules?: Rule[]
        class?: string
        showMessage?: boolean
        inlineMessage?: boolean
        size?: 'medium' | 'small' | 'mini'
        error?: string
        /**
         * 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
         */
        prop?: string
        labelRender?: {
            (
                h: CreateElement,
                column: {
                    /**
                     * 数据
                     */
                    row: FormColumn
                },
            ): any
        }
        /**自动触发子组件校验 */
        autoTriggerSubComponentValidate?: boolean
        [propName: string]: any
    }
    attrs?: ComponentProps

    componentProps?: (opt: {
        schema: FormColumn
        //tableAction: any
        formActionType: FormRef
        formModel: Recordable
    }) => FormColumn | null
    /**
     * 针对自定义组件绑定事件
     */
    on?: any
    buttons?: FormFieldButton[]
    render?: Render
    appendRender?: Render
    suffix?: string
    ifRender?: (row: Recordable) => boolean
    /** 获取数据时处理数据 */
    formatData?: (
        val: any,
        opt: {
            value: any
            name: string
            formModel: Recordable
        },
    ) => Record<string, unknown>
    /** 将数据转成组件需要的格式 */
    parseData?: (
        /** 表单数据 */
        val: Recordable,
        opt: {
            /** 表单名称 */
            name: string
        },
    ) => Record<string, unknown>

    [propName: string]: any
}

export interface TableRef extends Vue {
    onLoad: {
        (
            query?: {
                page?: number
                pageSize?: number
                [propName: string]: any
            },
            options?: any,
        ): void
    }
    [propName: string]: any
}
/**
 * 返回 { result: any[]; total: number }
 * @typedef {Promise | { result: any[]; total: number }} Val
 * @param {any[]} result 数量列表
 * @param {number} total 总数
 * @returns {Val}
 */
export interface TableLoadValue {
    result: any[]
    total: number
}
export interface TableLoad {
    (params: { page?: number; pageSize?: number; [propName: string]: any }): Promise | { result: any[]; total: number }
}
export interface FormRow {
    class?: string
    type?: string
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
    align?: 'top' | 'middl' | 'bottom'
    gutter?: number
    ifRender?: (row: any) => boolean
    columns?: FormColumn[]
    [propName: string]: any
}

export interface TableColumn {
    label?: string
    type?: string
    prop?: string
    width?: string
    fixed?: 'left' | 'right'
    align?: 'left' | 'center' | 'right'
    class?: string
    sortable?: 'custom' | true | false
    sortOrders?: []
    render?: Render
    children?: TableColumn[]
    /**
     * 是否导出该列
     */
    noExport?: boolean
    /**
     * 是否单行显示溢出提示
     */
    showOverflowTooltip?: boolean
    /** 溢出几行 ... 默认1 */
    overflowCount?: number
    [propName: string]: any
}
export interface FormRef extends Vue {
    /**
     * 设置表单model
     * @param name 可以是表单name或者对象
     * @param value 如果name是字符串则value必填
     * @returns
     */
    setState: (name: any, value?: any) => void
    getState: () => any
    init: {
        (fields?: FormRow[]): void
    }
    submit: {
        (): void
    }
    reset: {
        (): void
    }

    validate: (callback?: (valid: boolean, errors: any[]) => void, isSroll?: boolean) => Promise<any>

    validateField: {
        (prop: string | string[], callback?: any): Promise<any>
    }
    clearValidate: {
        (props?: any): void
    }

    getFieldProps: {
        (name: string): FormColumn
    }
    /**
     *
     * @param fieldName 表单域的name
     * @param propName 表单域的属性 'itemAttrs.rule'
     * @param propValue 值
     * @returns
     */
    updateSchema: (fieldName: string, propName: string, propValue: any) => void

    /**
     * 滚动到错误信息
     */
    scrollIntoView: () => void

    [propName: string]: any
}
