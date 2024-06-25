import { configAxisY, getEchartAxisConfig, getSeriesBar } from '@bigScreen/scripts/echarts/config'
import { setLinearGradient } from '@bigScreen/scripts/echarts/utils'
import { bus } from '../bus'
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
            dimensions: ['name', 'value'],
            source: source,
        },
        yAxis: [
            configAxisY({
                offset: 20,
            }),
        ],
        xAxis: [
            {
                axisLabel: {
                    // 设置字体的倾斜角度
                    interval: 0,
                    rotate: 30,
                },
            },
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
 * @description echarts_single_bar => bar-chart
 * @param {Array} source 图表数据
 * @returns {*} 图表配置项
 */
export const getPieOptions = (data: any, params: any = {}) => {
    const options = {
        legend: {
            show: false,
        },
        //colors: ['#C6A56A', '#5C90F6', '#3BBCD6', '#FF8856', '#8894B9'],

        series: [
            {
                type: 'pie',
                radius: ['92%', '78%'],
                emphasis: {
                    label: {
                        show: false,
                    },
                },

                avoidLabelOverlap: false,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#081940',
                    normal: {
                        color: function(colors: any) {
                            let colorList = params.colors || ['#fc8251', '#5470c6', '#9A60B4', '#ef6567', '#f9c956', '#3BA272']
                            return colorList[colors.dataIndex]
                        },
                    },
                },
                legend: { type: 'scroll' },
                labelLine: {
                    show: false,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                splitLine: {
                    length: 15,
                    lineStyle: {
                        width: 2,
                        color: '#999',
                    },
                },
                // emphasis: {
                //     itemStyle: {
                //         color: ['#4983f5', '#9259f0', '#3db9d2'],
                //     },
                //     label: {
                //         show: true,
                //         fontSize: '18',
                //         fontWeight: 'bold',
                //         formatter(params: any) {
                //             const { name, percent } = params
                //             return `${name}:\n${percent}%`
                //         },
                //     },
                // },
                data,
            },
        ],
    }

    return options
}

export const myMixins = {
    components: {},
    data() {
        return {
            row: {},
        }
    },
    computed: {
        exRow() {
            const result: any = {}
            const row = this.row

            row['执法事项']?.forEach((item: any) => {
                const { name, value } = item
                result[name] = value
            })
            result['高频事项'] = row['高频事项']?.map((item: any) => {
                return {
                    name: item.name.length > 25 ? item.name.slice(0, 25) + '...' : item.name,
                    value: +item.value,
                }
            })
            row['执法力量']?.forEach((item: any) => {
                const { name, value } = item
                result[name] = value
            })
            row['执法活动']?.forEach((item: any) => {
                const { name, value } = item
                result[name] = value
            })
            row['环形图']?.forEach((item: any) => {
                const { name, value } = item
                result[name] = value.replace('%', '')
            })
            row['执法保障']?.forEach((item: any) => {
                const { name, value } = item
                result[name] = value.replace('%', '')
            })
            result['执法风险预警'] = row['执法风险预警']?.map((item: any) => {
                return {
                    ...item,
                    value: +item.value,
                }
            })
            row['衢州服务群简报内容']?.forEach((item: any) => {
                const { name, value } = item
                result[name] = value.replace('%', '')
            })
            console.log('exRow', result)

            return result
        },
    },
    async mounted() {
        bus.$on('map-change', async name => {
            this.load(name)
        })
        this.load()
    },
    methods: {
        async load(name = '衢州市') {
            const { data } = await this.$http.request({
                url: '/mock/qzs',
                params: {
                    name,
                },
            })
            this.$set(this, 'row', data)
        },
    },
}
