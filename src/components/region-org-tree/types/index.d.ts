import { CreateElement, VNode } from 'vue'

export type OptionFieldNames = {
    label?: string
    value?: string
    children?: string
}

/**选项 */
export interface Option {
    /**选项值 */
    value: string | number
    /**选项文本 */
    label: string
    /**子节点 */
    children?: Option[]
    /**层级 */
    level?: number
    /**其他参数 */
    [key: string]: any
}
export interface RegionOrgTreeOption extends Option {
    /**选项值 */
    value?: string | number
    /**选项文本 */
    label?: string
    /**子节点 */
    children?: RegionOrgTreeOption[]
}

interface Render {
    (
        h: CreateElement,
        column: {
            /**
             * 选项数据
             */
            option: Option
            [propName: string]: any
        },
    ): VNode | string | number
}

/**左侧树配置 */
export interface LeftTreeConfig {
    /**选项集合 */
    options: RegionOrgTreeOption[] | (() => RegionOrgTreeOption[] | Promise<RegionOrgTreeOption[]>)
    /**是否显示父级选中节点 */
    isShowParentNode?: boolean
    /**选项字段配置 */
    optionFieldName: OptionFieldNames
}

/**右侧树配置 */
export interface RightTreeConfig {
    /**选项集合 */
    options: (data: {
        /**选中的地区对象 */
        selectedRegion?: Option
        /**选中的地区路径 */
        selectedRegionPath?: Option[]
        /**检索词 */
        keyword?: string
    }) => RegionOrgTreeOption[] | Promise<RegionOrgTreeOption[]>
    /**选项字段配置 */
    optionFieldName?: OptionFieldNames
    /**选项内容渲染函数 */
    renderOptionContent?: Render
}

/**搜索框配置 */
export interface SeachConfig {
    /**搜索建议选项集合 */
    suggestions: (data: {
        /**检索词 */
        keyword: string
    }) => RegionOrgTreeOption[] | Promise<RegionOrgTreeOption[]>
    /**选项字段配置 */
    optionFieldName?: OptionFieldNames
    /**选项内容渲染函数 */
    renderOptionContent?: Render
}
