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
    created() {
        setTimeout(() => {
            this.getChartDataFun()
        }, 300)
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    watch: {
        '$store.state.client': function(val) {
            if (val) {
                let height = this.$refs.myChart.offsetHeight
                let width = this.$refs.myChart.offsetWidth
                this.chart.clear()
                this.chart.resize({
                    height: height,
                    width: width,
                })
                this.getChartDataFun()
            }
        },
    },
    methods: {
        getChartDataFun() {
            let nameArr = [],
                dataArr = []
            nameArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            dataArr = [1267, 1543, 1386, 1402, 1694, 1780, 1850, 1822]
            this.chart = echarts.init(document.getElementById(this.id))
            var option
            option = {
                grid: {
                    left: '2%',
                    right: '5%',
                    top: '10%',
                    bottom: '0%',
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: { color: 'rgba(50, 216, 205, 1)' },
                    },
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: 1,
                        axisLine: { show: false },
                        axisLabel: { color: '#fff' },
                        splitLine: { show: false },
                        axisTick: { show: false },
                        data: nameArr,
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '',
                        padding: 5,
                        // max: 1000,
                        splitLine: {
                            show: true,
                            lineStyle: { color: '#A1A7B360', type: 'solid' },
                        },
                        axisLine: { show: false },
                        axisLabel: {
                            show: true,
                            margin: 10,
                            color: '#fff',
                        },
                        axisTick: { show: false },
                    },
                ],
                series: [
                    {
                        name: '数量',
                        type: 'line',
                        smooth: true,
                        stack: '总量',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: { color: '#23D0C4', width: 2 },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: 'rgba(50, 216, 205, 1)' },
                                    { offset: 1, color: 'rgba(255, 255, 255, 0.2)' },
                                ],
                                false,
                            ),
                        },
                        data: dataArr,
                    },
                ],
            }
            option && this.chart.setOption(option)
        },
    },
}
</script>
