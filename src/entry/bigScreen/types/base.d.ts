export type ILayoutType = 'column' | 'row'

export type ISize = 'large' | 'medium' | 'small'

export type IFlex = 'start' | 'center' | 'end'

export interface IStyle {
    /** 其它属性 */
    [propName: string]: any
}

/**
 * 布局 - 接口
 */
export interface ILayout {
    width?: string | number
    left?: string | number
    top?: string | number
    right?: string | number
    bottom?: string | number
}

export interface ITextItem {
    /** 标题 */
    title?: string
    /** 数值 */
    number?: number | string
    /** 单位 */
    unit?: string
    /** 数值保留小数位 */
    decimals?: number | string
    /** 数值对应的key名 */
    key?: string
    /** 其它属性 */
    [propName: string]: any
}

export interface IBaseItemOption {
    layout?: ILayoutType
    class?: string
    style?: IStyle
    attrs: ITextItem
    /** 其它属性 */
    [propName: string]: any
}

export interface IBaseItem {
    class?: string
    icon?: string
    options: Array<IBaseItemOption>
    /** 其它属性 */
    [propName: string]: any
}

/**
 * 组合块 - 接口
 */
export interface ILegendGroup extends ITextItem {
    /** 自定义百分比数值 */
    rate?: number | string
    /** 百分比小数位 */
    rateDecimals?: number
    /** 其它属性 */
    [propName: string]: any
}

/**
 * 饼图 - 接口
 */
export interface IPieChartOption {
    name: string
    value: string | number
    /** 其它 */
    [propName: string]: any
}

/**
 * 饼图-图例
 */
export interface IPieLegend extends ITextItem {
    /** 自定义百分比数值 */
    rate?: number | string
    /** 百分比小数位 */
    rateDecimals?: number
    /** 其它 */
    [propName: string]: any
}

/**
 * line、bar数据 - 接口
 */
export interface IChartData {
    xAxisData?: Record<string, any>
    seriesData: Record<string, any>
    chartTypes?: string[]
    colors?: string[]
    [propName: string]: any
}

export interface ITabOption {
    label: string
    value: number | string
    beforeLabel?: string
    afterLabel?: string
    [propName: string]: any
}

export interface ITabConfig {
    defaultBgColor?: string
    defaultColor?: string
    defaultFontSize?: string
    activeBgColor?: string
    activeColor?: string
    activeFontSize?: string
    [propName: string]: any
}
