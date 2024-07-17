import { configAxisY, getEchartAxisConfig, getSeriesBar } from '@bigScreen/scripts/echarts/config'
import { setLinearGradient } from '@bigScreen/scripts/echarts/utils'
import { ILayout } from '@bigScreen/types'

/**
 * 模块布局配置项
 */
export const LayoutConfig: Record<string, ILayout> = {
    one: { width: 500, left: 50, top: 144 },
    two: { width: 500, left: 50, top: 202 },
    three: { width: 500, left: 50, top: 468 },
    four: { width: 500, left: 50, top: 522 },
    five: { width: 500, left: 50, top: 776 },
    six: { width: 500, left: 50, top: 835 },
    seven: { width: 500, left: 50, top: 781 },
    eight: { width: 500, left: 50, top: 825 },
}

interface IModuleData {
    oneData: Record<string, any>
    [propName: string]: any
}

/**
 * 模块数据配置项
 */
export const ModuleDataConfig: IModuleData = {
    oneData: {
        title: 'single-bar-chart',
    },
    threeData: {
        title: 'two-bar-chart',
    },
    fiveData: {
        title: 'other-bar-chart',
    },
}

/**
 * @description echarts_single_bar => bar-chart
 * @param {Array} source 图表数据
 * @returns {*} 图表配置项
 */
export const getSingleBarOptions = (source: any) => {
    const options = {
        legend: {
            show: false,
        },
        grid: {
            top: 10,
            right: 0,
            bottom: 0,
            left: 6,
        },
        dataset: {
            dimensions: ['name', 'val1'],
            source: source,
        },
        yAxis: [
            configAxisY({
                offset: 20,
            }),
        ],
        series: [
            getSeriesBar({
                name: 'bar',
                yAxisIndex: 0,
                barWidth: 20,
                itemStyle: {
                    barBorderRadius: [4, 4, 0, 0],
                    color: setLinearGradient(['rgba(73,208,214,1)', 'rgba(63,191,255,0) ']),
                },
            }),
        ],
    }
    return getEchartAxisConfig(options)
}

/**
 * @description two-bar-chart => bar-chart
 * @param {Array} source 图表数据
 * @returns {*} 图表配置项
 */
export const getTwoBarChartOptions = (source: any) => {
    const options = {
        grid: {
            top: 32,
            right: 0,
            bottom: 0,
            left: 6,
        },
        dataset: {
            dimensions: ['name', 'val1', 'val2'],
            source: source,
        },
        xAxis: [
            {
                axisLabel: {
                    // 设置字体的倾斜角度
                    interval: 0,
                    rotate: 30,
                },
            },
        ],
        yAxis: [
            configAxisY({
                offset: 20,
            }),
        ],
        series: [
            getSeriesBar({
                name: 'bar1',
                yAxisIndex: 0,
                barWidth: 10,
                itemStyle: {
                    barBorderRadius: [4, 4, 0, 0],
                    color: setLinearGradient(['rgba(73,208,214,0.90)', 'rgba(63,191,255,0.30) ']),
                },
            }),
            getSeriesBar({
                name: 'bar2',
                yAxisIndex: 0,
                barWidth: 10,
                itemStyle: {
                    barBorderRadius: [4, 4, 0, 0],
                    color: setLinearGradient(['rgba(222,166,67,0.90)', 'rgba(63,191,255,0.30)']),
                },
            }),
        ],
    }
    return getEchartAxisConfig(options)
}

/**
 * @description 横向柱状图 => bar-chart
 * @param {Array} source 图表数据
 * @returns {*} 图表配置项
 */
export const getHorizontalBarChartOptions = (source: any) => {
    const options = {
        grid: {
            top: 32,
            right: 20,
            bottom: 0,
            left: 30,
            // x: -100,
        },
        dataset: {
            dimensions: ['name', 'val1', 'val2', 'val3', 'val4'],
            source: source,
        },
        yAxis: [
            configAxisY({
                type: 'category', // 设置坐标轴类型
                offset: 20,
                axisLabel: {
                    align: 'right',
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)',
                        type: 'dashed',
                    },
                },
            }),
        ],
        xAxis: [
            {
                type: 'value', // 设置数据显示
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                //  坐标轴在 grid 区域中的分隔线
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.2)',
                        type: 'dashed',
                    },
                },
            },
        ],
        series: [
            getSeriesBar({
                name: 'bar1',
                yAxisIndex: 0,
                barWidth: 10,
                stack: 'total',
                itemStyle: {
                    barBorderRadius: 0,
                    color: setLinearGradient(['rgba(73,208,214,1)', 'rgba(63,191,255,0.3) ']),
                },
            }),
            getSeriesBar({
                name: 'bar2',
                yAxisIndex: 0,
                barWidth: 10,
                stack: 'total',
                itemStyle: {
                    barBorderRadius: [0, 4, 4, 0],
                    color: setLinearGradient(['rgba(194,87,255,0.90)', 'rgba(63,191,255,0.30)']),
                },
            }),
        ],
    }
    return getEchartAxisConfig(options)
}
