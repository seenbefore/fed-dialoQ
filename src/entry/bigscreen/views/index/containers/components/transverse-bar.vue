<template>
    <!-- 纵向柱状图 -->
    <div ref="myChart" :chartData="chartData" :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'

export default {
    props: {
        className: {
            type: String,
            default: 'chart',
        },
        id: {
            type: String,
            default: 'chart',
        },
        width: {
            type: String,
            default: '200px',
        },
        height: {
            type: String,
            default: '200px',
        },
        chartData: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            chart: null,
        }
    },
    mounted() {},
    watch: {
        chartData: function(val) {
            if (val) {
                this.getChartDataFun(val)
            }
        },
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        getChartDataFun(chartData) {
            if (!chartData) {
                return
            }
            // let bjlxChartData = {
            //     areaName: ['人行道违法停放非机动车', '人行道违法停放机动车', '室外无证无照经营', '乱扔废弃物', '未在规定时间内溜犬'],
            //     eventCount: [26099, 12612, 4495, 2324, 1196],
            // }
            let bjlxChartData = {
                areaName: chartData.map(item => item.name),
                eventCount: chartData.map(item => +item.value),
            }
            let max = Math.max(...bjlxChartData.eventCount)
            var maxArr = []
            for (var i = 0; i < bjlxChartData.eventCount.length; i++) {
                maxArr.push(max)
            }

            this.chart = echarts.init(document.getElementById(this.id))
            var option
            option = {
                // backgroundColor: "#07284d",
                grid: {
                    left: '1%',
                    top: '10rem',
                    right: '0%',
                    bottom: '-10%',
                    containLabel: true,
                },
                xAxis: [{ show: false }],
                yAxis: [
                    {
                        axisTick: 'none',
                        axisLine: 'none',
                        inverse: true,
                        axisLabel: {
                            inside: true,
                            color: '#fff',
                            fontSize: 14,
                            margin: 0,
                            padding: [0, 0, 6, 0],
                            align: 'left',
                            verticalAlign: 'bottom',
                            formatter: function(value) {
                                return value
                            },
                        },
                        data: bjlxChartData.areaName,
                    },
                    {
                        axisTick: 'none',
                        axisLine: 'none',
                        inverse: true,
                        axisLabel: {
                            color: '#fff',
                            fontSize: 14,
                            verticalAlign: 'center',
                            align: 'right',
                            formatter: function(value, index) {
                                return value
                            },
                        },
                        data: bjlxChartData.eventCount,
                    },
                ],
                series: [
                    {
                        name: '条',
                        type: 'bar',
                        stack: '圆',
                        yAxisIndex: 0,
                        // data: data,
                        data: bjlxChartData.eventCount,
                        barWidth: 4,
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#199BFF', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#00FFEA', // 100% 处的颜色
                                    },
                                ],
                            },
                            borderRadius: 0,
                        },
                        z: 2,
                    },
                    {
                        name: 'XXX',
                        type: 'pictorialBar',
                        symbol:
                            'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAMAAAApB0NrAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABC1BMVEUA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7QA/7SO/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/86O/85K/8IT/7gM/7YP/7cs/7wB/7QH/7Vl/8cZ/7kA/7QH/7WJ/80C/7Qk/7st/7wM/7aO/84g/7oI/7Y8/78N/7aO/84E/7UA/7Q1/76O/84q/7wB/7QN/7Yp/7wD/7UB/7QR/7ct/7wa/7kg/7pr/8iO/86O/86O/86O/84A/7QAAAAmnbE7AAAAV3RSTlMAAwsQFBcYFhINBgkaDgIHGREFDwEKBAwIFRMHDRETEg8KAgsXGhkQAxUJBRgELnSThkT0riNl/rIb4U5CkhRUpTeIBs77OwFH9opI1PF6Q2NTIQgWDA6QHRcgAAAAAWJLR0RY7bXEjgAAAAd0SU1FB+ULEBQKJQdQcX4AAAITSURBVDjLbVRnY5swEBVmCMxhC2MgdrwdPJK46d5N2roJ3Stt/f//SXUnbFbeF3THk+54pwdjBWgN3TAtk9tOk90N14AcpteqM9ocQPiNptbSOm6AgdMtM7o6AA8LyaYtE1GR0jJAxJVtTQ7iqEDpgdmpVe/6RVIfuKZWx4PhaDyZzlQUgNhvdcBUlPlJorBYrijhA1cdRAJIjtU6ybE4pXIcPOLYEODj7DwpYUCNg8ASHRAo1+okqeBUVQuoMTpmVKUkiw2dYMmOLMDej7MX9y7uP3iYrce4twdtFoFZOObi0U7i8RMV4cd5smsXfLmaqeTTZzvCcxXOcY7Ql+I4h1IvXu4yvKJ4iPdF1gmgIVdTyr3eU3ZvKL5EiUAwHUJUmHJXB85bitfYKUDpnHcHznuKRzhvsGQ/qPZWNfkho1zfULjESQGX32XLVbqg5MdPivM5Vxrfa/IsiaHKfvkqGd++Z0KnNAb53VwKydhmP4EfP3/9zpYT3GzipXBIRDapzet8RhLiGDQBeLfTy+pIt7jVgBgfulQbx7EuU27JczR2qYBFErF0WaD8OSPjWqQwkYXy7na8Z8xTuqqGKqHuv5UZfHb7999gusnMI/2SO1o6Kaz5K+qBVXRqAGBrZQfGomJmFgoQeu7VVmwC+BV3M83HP4oeu2039PAvw49YHZFnHX4/wr6LQeg0Ar/v63G7VOU/Y9Ve2lDCOJ4AAAAASUVORK5CYII=',
                        symbolSize: [40, 40],
                        symbolPosition: 'end',
                        symbolOffset: [20, 0],
                        z: 12,
                        data: bjlxChartData.eventCount,
                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: 4,
                        barGap: '-100%',
                        data: maxArr,
                        itemStyle: {
                            color: 'rgba(28, 128, 213, 0.19)',
                            borderRadius: 0,
                        },
                    },
                ],
            }
            option && this.chart.setOption(option)
        },
    },
}
</script>
