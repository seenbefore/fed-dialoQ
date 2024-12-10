import Vue, { CreateElement, Component, AsyncComponent } from 'vue'

/**
 * 操作类型 [edit: 编辑, readonly: 只读]
 */
export type OperaType = 'edit' | 'readonly'

export interface LinkageWatcher {
    /**监听的值 */
    watch: string[]
    /**监听的值变化后的操作函数 */
    handler: (values: any) => Promise<any> | any
    /**deep: 深度监听; immediate: 立即监听 */
    options?: { deep?: boolean; immediate?: boolean }
}
interface Render {
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

interface Rule {
    trigger?: string
    validator?: (rule: any, value: any, callback: () => void) => void
    message?: string
    [propName: string]: any
}

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
    | 'input-number'
    | string
    | Component<any, any, any, any>
    | AsyncComponent<any, any, any, any>
export interface TableFormColumn {
    class?: string
    /**
     * 可选值： | 'text'| 'input'| 'select'| 'date'| 'time'| 'checkbox'| 'radio'| 'cascader'| 'uploader'| 'autocomplete'| 'range'|
     * 全局组件名称 | 组件 | 异步组件
     */
    tag?: FormFieldTag
    itemAttrs?: {
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
                    row: TableFormColumn
                },
            ): any
        }
        [propName: string]: any
    }
    attrs?: {
        value?: any
        multiple?: boolean
        options?: any
        placeholder?: string
        // inputSlots?: inputSlot[]
        appendSlot?: string
        prependSlot?: string
        autocompleteSlot?: string
        [propName: string]: any
        /**
         * 数据变化回调函数
         */
        // onChange?: onChange
    }
    // buttons?: FormFieldButton[]
    render?: Render
    appendRender?: Render
    ifRender?: (row: any) => boolean
    /**
     * 自定义组件是否具有只读模式
     * (为false时，则使用表单组件内置的只读模式，否则有自定以组件自己控制)
     * 默认为false
     */
    withReadonlyModel?: boolean
    /**联动规则监听器 */
    linkageRule?: LinkageWatcher

    /**表头名 */
    label?: string
    /**列类型 */
    type?: 'index' | 'action'
    /**对应列内容的字段名 */
    prop?: string
    /**对应列的宽度 */
    width?: string
    /**对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 */
    minWidth?: string
    /**对齐方式 */
    align?: 'left' | 'center' | 'right'
    /**对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 */
    sortable?: 'custom' | true | false
    // sortOrders?: []
    /**表头要合并的单元格数(横向合并) */
    headerColspan?: number
    /**表头内容渲染函数 */
    headerRender?: Render

    children?: TableFormColumn[]
    [propName: string]: any
}

export interface FileProp {
    name: string
    url: string
    [k: string]: any
}
