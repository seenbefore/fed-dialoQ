import { formatDate } from '@/scripts/utils/time'

/**
 * 默认一天
 * @param range
 */
export function getTimeRange(range = 24 * 60 * 60 * 1000) {
    const now = new Date()
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0)
    const start = new Date(end.valueOf() - range)
    //end.setMinutes(end.getMinutes() + 1)
    return [formatDate(start, 'YYYY-MM-DD HH:mm:ss'), formatDate(end, 'YYYY-MM-DD HH:mm:ss')]
}

export function created(data: any[] = []) {
    const xAxisData = data.map(item => item.label)
    const yAxisData = data.map(item => item.value)
    return {
        title: {
            x: 70,
            y: 30,
            textStyle: {
                fontSize: 14,
            },
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                color: '#595959',
            },
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {
                    // 直线指示器样式设置
                    color: '#A9ACB2',
                    width: 1,
                    type: 'solid',
                },
            },
            formatter: (params: any) => {
                return `${params[0].name}<br/>错误: ${params[0].value}`
            },
        },
        legend: {
            padding: [30, 68, 0, 0],
            icon: 'rect',
            itemHeight: 3, // 设置高度
            textStyle: {
                color: '#fff',
            },
            x: 'right',
            y: 'top',
        },
        color: ['#00b4ff', '#ff9900', '#FD3B3B', '#58F76F', '#973BFD'],
        grid: {
            color: '#fff',
            top: '10%',
            bottom: '25%',
            left: '5%',
            right: '3%',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#9798bc',
                },
            },
            data: xAxisData,
            axisLabel: {
                interval: 0, // 强制显示所有标签
                rotate: 30, // 不旋转标签
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#b4b4d7',
                },
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(165,165,165, 0.2)',
                    type: 'dashed',
                },
            },
        },
        series: [
            {
                data: yAxisData,
                type: 'line',
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
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 2,
                        },
                    },
                },
                symbolSize: 6,
            },
        ],
    }
}

let p = {
    duration: 'week',
    filter: {
        startTime: '2023-12-26 12:00:00',
        endTime: '2023-12-30 12:00:00',
        // UNKNOWN、UNKNOWN_FUNCTION、LOG_ERROR、HTTP_ERROR、VUE_ERROR、REACT_ERROR、RESOURCE_ERROR、PROMISE_ERROR、ROUTE_ERROR
        message: 'data.message',
        name: 'data.name',
        url: 'data.url',
        clientName: 'clientName',
    },
}
