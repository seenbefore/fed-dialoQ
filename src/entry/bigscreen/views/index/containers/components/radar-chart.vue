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
            this.chart = echarts.init(document.getElementById(this.id))
            var option
            option = {
                title: {
                    show: true,
                    text: '三次以上\n投诉分布',
                    textStyle: {
                        color: '#ffffffcc',
                        fontSize: 16,
                        fontWeight: 400,
                    },
                    left: 'center',
                    top: 'center',
                },
                tooltip: {
                    //雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
                    confine: true,
                    enterable: true, //鼠标是否可以移动到tooltip区域内
                },
                radar: {
                    axisName: { color: '#fff', fontSize: 12 },
                    shape: 'polygon',
                    center: ['50%', '50%'],
                    radius: '60%',
                    startAngle: 12,
                    scale: true,
                    axisLine: { lineStyle: { color: '#2674b3' } },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            width: 1,
                            color: '#2674b3', // 设置网格的颜色
                            type: 'dashed',
                        },
                    },
                    indicator: [
                        { name: '违法停车', max: 600 },
                        { name: '社会生活噪声污染', max: 600 },
                        { name: '违法建设', max: 600 },
                        { name: '违法装修', max: 600 },
                        { name: '超标排污', max: 600 },
                        { name: '恶臭气体', max: 600 },
                        { name: '无照经营', max: 600 },
                    ],
                    splitArea: { show: false },
                },
                grid: {
                    position: 'center',
                },
                polar: {
                    center: ['50%', '50%'], // 默认全局居中
                    radius: '0%',
                },
                angleAxis: {
                    min: 0,
                    interval: 5,
                    clockwise: false,
                    axisTick: { show: false },
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    splitLine: { show: false },
                },
                radiusAxis: {
                    min: 0,
                    interval: 20,
                    splitLine: { show: false },
                },
                series: [
                    {
                        name: '',
                        type: 'radar',
                        symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                        symbolSize: 1, // 拐点的大小
                        itemStyle: { color: '#05D5FF' },
                        areaStyle: { color: '#05D5FF', opacity: 0.3 },
                        lineStyle: { width: 2, color: '#05D5FF' },
                        label: {
                            show: false,
                            formatter: params => {
                                return params.value
                            },
                            color: '#fff',
                        },
                        data: [{ value: [583, 367, 125, 112, 68, 67, 354] }],
                    },
                ],
            }
            option && this.chart.setOption(option)
        },
    },
}
</script>
