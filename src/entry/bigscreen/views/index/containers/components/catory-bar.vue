<!--
	Describe案件来源chart
-->
<template>
    <div id="qkChart" ref="qkChart" :style="{ width: '100%', height: '99%' }"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            qkChart: null,
        }
    },
    computed: {},
    mounted() {
        var that = this
        this.$nextTick(() => {
            that.initChart()
        })
    },
    methods: {
        initChart: function() {
            var _this = this
            let qkdom = this.$refs.qkChart
            var qkChart = echarts.init(qkdom)
            // this.$nextTick(() => {
            //   qkChart.resize();
            // });
            var xLabel = ['综合执法', '交通运输', '应急管理', '生态环境', '市场监管', '卫生健康']
            var getwkrs = [158, 36, 27, 58, 131, 59]
            var option = {
                animation: true,
                grid: {
                    top: '10%',
                    left: '7%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true,
                },
                tooltip: {
                    // 格式化提示内容
                    // formatter: function (params) {
                    //   return params.name + " : " + params.value ;
                    // },
                },
                legend: {
                    data: ['高频执法'],
                    // right: 10,
                    // top: 12,
                    textStyle: {
                        color: '#fff',
                    },
                    itemWidth: 12,
                    itemHeight: 10,
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true,
                        axisLine: {
                            //坐标轴轴线相关设置。数学上的x轴
                            show: true,
                            lineStyle: {
                                color: 'rgb(41,188,245,.3)',
                            },
                        },
                        axisLabel: {
                            //坐标轴刻度标签的相关设置
                            textStyle: {
                                color: 'rgb(188,217,230)',
                                fontSize: 14,
                            },
                            formatter: function(data) {
                                return data
                            },
                            rotate: 25,
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#233653',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        data: xLabel,
                    },
                ],
                yAxis: [
                    {
                        min: 0,
                        max: 200,
                        interval: 50,
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgb(41,188,245,.3)',
                            },
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#233653',
                            },
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: 'rgb(188,217,230)',
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                    },
                ],
                color: ['rgb(50, 231, 230)'],
                series: [
                    {
                        name: '高频执法',
                        type: 'bar',
                        z: 1,
                        data: getwkrs,
                        barWidth: '9px',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var maxIndex = 3
                                    let colors = []
                                    colors = ['rgb(50, 231, 230)', 'rgb(50, 231, 230)', 'transparent']
                                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 1, color: colors[0] },
                                        { offset: 0.3, color: colors[1] },
                                        { offset: 0, color: colors[2] },
                                    ])
                                },
                            },
                        },
                        markLine: {
                            label: {
                                show: true,
                                position: 'middle',
                            },
                            // data: [{ type: 'average', name: '平均值' }]
                        },
                    },
                    // {
                    //   name: "",
                    //   barGap: "-250%",
                    //   type: "bar",
                    //   z: 0,
                    //   data: [300, 300, 300, 300, 300, 300, 300],
                    //   barWidth: "48px",
                    //   itemStyle: {
                    //     normal: {
                    //       color: "rgba(4,22,34,0.9)", // 0% 处的颜色
                    //     },
                    //   },
                    // },
                ],
            }
            qkChart.setOption(option)
        },
    },
    components: {},
}
</script>

<style scoped="scoped"></style>
