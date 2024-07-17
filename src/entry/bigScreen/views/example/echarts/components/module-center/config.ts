import { configAxisY, getEchartAxisConfig, getSeriesLine } from '@bigScreen/scripts/echarts/config'
import { ILayout } from '@bigScreen/types'

/**
 * 模块布局配置项
 */
export const LayoutConfig: Record<string, ILayout> = {
    one: { width: 500, left: 650, top: 144 },
    two: { width: 500, left: 650, top: 202 },
    three: { width: 500, left: 650, top: 468 },
    four: { width: 500, left: 650, top: 522 },
    five: { width: 500, left: 650, top: 645 },
    six: { width: 500, left: 650, top: 695 },
    seven: { width: 500, left: 650, top: 781 },
    eight: { width: 500, left: 650, top: 825 },
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
        title: 'single-line-chart',
    },
    threeData: {
        title: 'two-line-chart',
    },
}

/**
 * @description single-line-chart
 * @param {Array} source 图表数据
 * @returns {*} 图表配置项
 */
export const getSingleLineOptions = (source: any) => {
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
                offset: 0,
                axisLabel: {
                    align: 'right',
                    formatter(value: any, index: number) {
                        return `${value}%`
                    },
                },
            }),
        ],
        series: [
            getSeriesLine({
                name: 'line',
                yAxisIndex: 0,
                smooth: true, // 设置平滑曲线
                itemStyle: {
                    color: '#50C8FF',
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#50C8FF', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(80,200,255,0)', // 100% 处的颜色
                            },
                        ],
                        global: false, // 缺省为 false
                    },
                },
            }),
        ],
    }
    return getEchartAxisConfig(options)
}

/**
 * @description two-line-chart
 * @param {Array} source 图表数据
 * @returns {*} 图表配置项
 */
export const getTwoLineChartOptions = (source: any) => {
    const options = {
        grid: {
            top: 32,
            right: 0,
            bottom: 0,
            left: 6,
        },
        legend: {
            data: [
                {
                    name: 'line1',
                    icon: 'circle',
                },
                {
                    name: 'line2',
                    icon: 'line',
                },
            ],
        },
        dataset: {
            dimensions: ['name', 'val1', 'val2'],
            source: source,
        },
        yAxis: [
            configAxisY({
                offset: 20,
            }),
        ],
        series: [
            getSeriesLine({
                name: 'line1',
                yAxisIndex: 0,
                smooth: true, // 设置平滑曲线
                itemStyle: {
                    color: '#DEA643',
                },
            }),
            getSeriesLine({
                name: 'line2',
                yAxisIndex: 0,
                smooth: true, // 设置平滑曲线
                itemStyle: {
                    color: '#50C8FF',
                },
            }),
        ],
    }
    return getEchartAxisConfig(options)
}
