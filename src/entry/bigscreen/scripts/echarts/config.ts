import { merge } from 'lodash'
import * as echarts from 'echarts'

export const COLOR_1 = '#DEA643'
const COLOR_LINE1 = 'rgba(255,255,255,0.2)'
const DEFAULT_WHITE_COLOR = 'rgba(255,255,255, 0.7)'

export const chartColor1 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
        offset: 0,
        color: 'rgba(73,208,214,0.90)', // 0% 处的颜色
    },
    {
        offset: 1,
        color: 'rgba(63,191,255,0.30)', // 100% 处的颜色
    },
])

export const chartColor2 = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
        offset: 0,
        color: 'rgba(222,166,67,0.80)', // 0% 处的颜色
    },
    {
        offset: 1,
        color: 'rgba(222,166,67,0.00)', // 100% 处的颜色
    },
])

export const getSeriesBar = (config = {}) => {
    const baseConfig = {
        type: 'bar',
        barWidth: 20,
        itemStyle: {
            barBorderRadius: [4, 4, 0, 0],
            color: chartColor1,
        },
    }
    return merge(baseConfig, config)
}

export const getSeriesLine = (config = {}) => {
    const baseConfig = {
        type: 'line',
        showSymbol: false,
        itemStyle: {
            color: COLOR_1,
        },
        lineStyle: {
            width: 2.5,
        },
    }
    return merge(baseConfig, config)
}

export const configAxisY = (config = {}) => {
    return merge(
        {
            type: 'value',
            offset: 18,
            nameTextStyle: {
                color: '#fff',
                fontSize: 14,
            },
            splitNumber: 3,
            axisLabel: {
                align: 'left',
                textStyle: {
                    color: DEFAULT_WHITE_COLOR,
                    fontSize: 14,
                },
                formatter(value: any, index: any) {
                    if (`${value}`.length === 1) {
                        return `{single|${value}}`
                    } else {
                        return value
                    }
                },
                rich: {
                    single: {
                        fontSize: 14,
                        padding: 3,
                    },
                },
            },
            // 去除刻度
            axisTick: {
                show: false,
            },
            splitLine: {
                //分割线配置
                lineStyle: {
                    color: COLOR_LINE1,
                    type: 'dashed', // 这里，设置折线类型
                },
            },
            // 去除x坐标轴的颜色
            axisLine: {
                show: false,
            },
        },
        config,
    )
}

export const getEchartAxisConfig = (options = {}, config = {}) => {
    const { multiAxis = false }: any = config
    const yAxis = [configAxisY()]
    if (multiAxis) {
        yAxis.push(
            configAxisY({
                offset: 28,
                axisLabel: {
                    align: 'right',
                    formatter(value: any, index: any) {
                        return value
                    },
                },
            }),
        )
    }

    const baseConfig = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            backgroundColor: '#000B2D',
            borderColor: 'rgba(0,84,255,0.6)',
            textStyle: {
                color: '#fff',
                fontSize: 14,
                fontFamily: 'SourceHanSansCN',
            },
        },
        legend: {
            left: 'center',
            icon: 'circle',
            itemGap: 28,
            itemWidth: 12,
            itemHeight: 12,
            textStyle: {
                color: '#fff',
                fontSize: 13,
            },
        },
        grid: {
            top: 30,
            left: '3%',
            right: '3%',
            bottom: 6,
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    textStyle: {
                        color: DEFAULT_WHITE_COLOR,
                        // color: '#DEA643',
                        fontSize: 14,
                    },
                },
                // 去除刻度
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                },
                // 去除x坐标轴的颜色
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#55618c',
                        type: 'solid', // 这里，设置折线类型
                    },
                },
                axisPointer: {
                    type: 'shadow',
                },
            },
        ],
        yAxis,
    }
    return merge(baseConfig, options)
}
