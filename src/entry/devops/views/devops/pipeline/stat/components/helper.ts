import { formatDate } from '@/scripts/utils/time'
export function getRecentDays(startDay: any, numDays = 10) {
    let dates = []

    for (let i = 0; i < numDays; i++) {
        let date = new Date(startDay) // 创建一个新的日期对象

        date.setDate(startDay.getDate() - i) // 设置日期为起始日期减去i天

        // 设置开始日期的时间为8点

        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)

        // 设置结束日期的时间为23点

        let endDate = new Date(date)
        endDate.setHours(23)
        endDate.setMinutes(59)
        endDate.setSeconds(59)

        dates.unshift({
            start: formatDate(date, 'YYYY-MM-DD HH:mm:ss'),
            end: formatDate(endDate, 'YYYY-MM-DD HH:mm:ss'),
        })
    }

    return dates
}
/**
 * 排行
 * @param data
 * @returns
 */
export function createRankOption(
    data: any = [
        // { value: '20599', name: '1月' },
        // { value: '56502', name: '2月' },
        // { value: '36094', name: '3月' },
        // { value: '32101', name: '4月' },
        // { value: '20201', name: '5月' },
        // { value: '10126', name: '6月' },
        // { value: '9505', name: '7月' },
        // { value: '7500', name: '8月' },
    ],
) {
    function getRandomColor(index: any) {
        //const colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
        //const colors = ['rgba(155, 0, 255, 1)', 'rgba(0, 255, 255, 1)', 'rgba(250, 192, 0, 1)', 'rgba(0, 121, 255, 1)']
        const colors = ['#4B7CF3', '#dd3ee5', '#12e78c', '#fe8104', '#01C2F9', '#FD9E06']
        return colors[index % colors.length]
    }
    // const barWidth = 3
    // const labelFontSize = 10
    return {
        grid: {
            top: '10%',
            bottom: '0%',
            left: '0%',
            right: '0%',
            containLabel: true,
        },
        //x轴
        xAxis: {
            type: 'category', //坐标轴类型
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                },
            },
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },
            axisLabel: {
                interval: 0, // 强制显示所有标签
                rotate: 40, // 不旋转标签
                formatter: function(value: any, index: any) {
                    return value.slice(0, 9)
                },
            },

            data: data.map((item: any) => item.name),
        },
        // y轴
        yAxis: {
            type: 'value',

            position: 'left',
            data: data.map((item: any) => item.name),
            axisLine: {
                show: false,
                lineStyle: {
                    show: false,
                    color: '#000',
                },
            },
            axisLabel: {
                //color: 'rgba(191, 247, 255, 1)',
                //fontSize: labelFontSize,
            },
            splitLine: {
                show: false,
                lineStyle: {
                    show: false,
                    color: '#000',
                    type: 'dashed',
                },
            },
        },
        // 提示框组件。
        tooltip: {
            trigger: 'axis',
            formatter: function(params: any) {
                const [target] = params
                const { data } = target || {}
                let tips = data.tips || []
                //tips = tips.join('<br>')

                // params 是一个数组，数组中包含每个系列的数据信息
                let result = tips.join('<br>')
                // let result = ''
                // params.forEach(function(item: any) {
                //     // item 是每一个系列的数据
                //     const seriesName = item.seriesName // 系列名称
                //     const value = item.value // 数据值
                //     const projects = item.projects.join(',')
                //     result += `${projects}<br/>`
                // })
                return result
            },
        },
        series: [
            {
                type: 'bar', //柱状图
                barMaxWidth: 20,
                //barWidth,
                data: data.map((item: any, index: any) => {
                    const isTop3 = index >= data.length - 3
                    return {
                        value: item.value,
                        tips: item.tips,
                        itemStyle: {
                            color: isTop3 ? '#01C2F9' : '#4B7CF3',
                        },
                    }
                }),
                label: {
                    show: true,
                    position: 'top',
                    //color: 'rgba(0, 222, 255, 1)',
                    //fontSize: labelFontSize,
                    //position: 'right',
                },
                itemStyle: {},
            },
        ],
    }
}

/**
 * 生成pie
 * @param data
 * @returns
 */
export function createPieOption(data: any = []) {
    return {
        color: ['rgba(135, 208, 81, 0.75)', 'rgba(217, 95, 95, 0.75)', 'rgba(250, 192, 0, 1)', 'rgba(0, 121, 255, 1)'],
        tooltip: {},
        legend: {
            itemWidth: 8,
            itemHeight: 8,
            show: true,
            textStyle: {
                fontSize: 12,
                // color: 'rgba(255, 255, 255, 0.5)',
            },
            bottom: 0,
        },
        label: {
            fontSize: 14,
            color: 'auto',
            formatter: ({ percent }: any) => `${percent}%`,
        },

        series: [
            {
                type: 'pie',
                //roseType: 'radius',
                // center: ['50%', '40%'],
                // radius: '65%',
                data: data.sort(function(a: any, b: any) {
                    return b.value - a.value
                }),
            },
        ],
    }
}

export function createLineOption(data: any = {}) {
    return {
        tooltip: {
            show: true,
            trigger: 'axis',
        },
        legend: {
            textStyle: {
                fontSize: 14,
            },
            itemHeight: 10,
            itemWidth: 10,
            top: '0',
            data: ['构建次数'],
        },
        grid: {
            top: '30px',
            left: '0',
            right: '5px',
            bottom: '10px',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: data.xData ?? [],
            axisLabel: {
                fontSize: '14px',
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                },
            },
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },
        },
        yAxis: {
            type: 'value',
            splitNumber: 3,
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },
            axisLabel: {
                fontSize: '14px',
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                },
            },
        },
        series: [
            {
                type: 'line',
                name: '构建次数',
                label: {
                    show: true,
                    position: 'top',
                    //color: 'rgba(0, 222, 255, 1)',
                    //fontSize: labelFontSize,
                    //position: 'right',
                },
                data: data.yData ?? [],
                barWidth: 14,
                symbolSize: 8,
                areaStyle: {
                    normal: {
                        color: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(48,84,235,0.8)', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255,255,255,0)', // 100% 处的颜色
                                },
                            ],
                            globalCoord: false, // 缺省为 false
                        },
                    },
                },
                // itemStyle: {
                //     color: '#11FF9D',
                // },
            },
            // {
            //     type: 'line',
            //     name: '增长率',
            //     data: [],
            //     symbolSize: 8,
            //     itemStyle: {
            //         color: '#11FF9D',
            //     },
            // },
        ],
    }
}

export function createBarOption(data: any = []) {
    return {
        grid: {
            top: '0%',
            bottom: '0%',
            left: '30%',
            right: '10%',
        },
        xAxis: {
            type: 'value',
            position: 'top', // 设置坐标轴位置为顶部
        },
        yAxis: {
            type: 'category',
            data: data.map(function(item: any) {
                return item.name
            }),
            axisLabel: {
                interval: 0, // 强制显示所有标签
                rotate: 0, // 不旋转标签
            },
        },
        series: [
            {
                type: 'bar',
                data: data.map(function(item: any) {
                    return item.value
                }),

                label: {
                    width: 220,
                    show: true,
                    position: 'right', // 标签显示在右侧
                },
                itemStyle: {
                    normal: {
                        borderRadius: [3, 20, 20, 3],
                        color: function(params: any) {
                            // 设置柱形图的颜色
                            if (params.dataIndex === data.length - 1) {
                                return '#d84430'
                            } else if (params.dataIndex === data.length - 2) {
                                return '#f38237'
                            } else if (params.dataIndex === data.length - 3) {
                                return '#e2aa20'
                            } else {
                                return '#608289'
                            }
                        },
                    },
                },
            },
        ],
    }
}
export function createPublishOption(data: any = []) {
    const data1 = [
        { name: '项目A', value: [10, 20, 30, 40, 50, 60, 70, 80, 90, 80, 70, 60, 50, 40, 30, 20, 10, 20, 30, 40, 50, 60, 70, 80] },
        { name: '项目B', value: [null, 30, 40, 50, 60, 70, 80, 90, 80, 70, 60, 50, 40, 30, 20, 10, 20, 30, 40, 50, 60, 70, 80, 90] },
        { name: '项目C', value: [null, null, null, null, 60, 70, 80, 90, 80, 70, 60, 50, 40, 30, 20, 10, 20, 30, 40, 50, 60, 70, 80, 90] },
    ]

    //生成24小时的时间范围数组数据。
    return {
        grid: {
            top: '60px',
            left: '30px',
            right: '10px',
            bottom: '0px',
            containLabel: true,
        },

        tooltip: {
            trigger: 'axis',
            formatter: function(params: any) {
                let content = params[0].name + '点<br/>'

                params
                    .filter((item: any) => item.value)
                    .forEach((param: any) => {
                        content += param.seriesName + ': ' + param.value + '<br/>'
                    })
                return content
            },
            axisPointer: {
                animation: false,
            },
        },
        xAxis: {
            type: 'category',
            data: Array.from(Array(25).keys()),
            boundaryGap: false,
            //type: 'time',
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                },
            },
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                },
            },

            // axisLabel: {
            //     formatter: function(value: any, index: any) {
            //         let date = new Date(value)
            //         let hour: any = date.getHours()
            //         let minutes: any = date.getMinutes()
            //         if (hour < 10) {
            //             hour = '0' + hour
            //         }
            //         if (minutes < 10) {
            //             // minutes = '0' + minutes
            //         }
            //         return hour + ':' + minutes
            //     },
            //     color: '#1B2232',
            // },
        },
        yAxis: {
            name: '发布次数',
            nameTextStyle: {
                color: '#1B2232',
                fontSize: 15,
            },
            //type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: '#1B2232',
                },
            },
            axisLabel: {
                color: '#1B2232',
            },
        },
        series: data.map((item: any) => ({
            type: 'bar',
            name: item.name,
            data: item.value, // y 轴数据，表示每个小时对应的发布数量
        })),
        legend: {
            type: 'scroll',
            data: data.map((item: any) => item.name),
            // bottom: 8,
        },
        // series: data ?? [
        //     {
        //         name: '11',
        //         type: 'bar',
        //         data: [[1596038400000, 153]],
        //     },
        //     {
        //         name: '22',
        //         type: 'bar',
        //         data: [
        //             [1596039040000, 13],
        //             [1596064896000, 60],
        //         ],
        //     },
        //     {
        //         name: '33',
        //         type: 'bar',
        //         data: [[1596070912000, 53]],
        //     },
        // ],
    }
}
