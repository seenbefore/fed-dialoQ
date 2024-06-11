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

export function createBarOption(data: any = []) {
    return {
        grid: {
            top: '0%',
            bottom: '0%',
            left: '10%',
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
                barMaxWidth: 10,
                label: {
                    width: 220,
                    show: true,
                    position: 'right', // 标签显示在右侧
                },
                itemStyle: {
                    normal: {
                        borderRadius: [3, 10, 10, 3],
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
