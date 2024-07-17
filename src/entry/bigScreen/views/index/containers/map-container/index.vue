<!--
	Describe：大屏地图
-->
<template>
    <div class="chartContent">
        <div class="btns_div">
            <div @click="hrefFun('http://datav.flysee.com/alpha/front/#/')" class="btn_item_div btn_item_bg1"><span>综合飞一次</span></div>
            <div @click="hrefFun('http://gasweb.zzj.qz.gov.cn:7790/login.html')" class="btn_item_div btn_item_bg2"><span>监管一件事</span></div>
        </div>
        <div ref="myChart" :style="{ width: '800px', height: '800px' }"></div>
    </div>
</template>

<script>
import { bus } from '../../bus'
import * as echarts from 'echarts'
// import 'echarts-gl'
import mapJson from './map.json'

export default {
    data() {
        return {
            selectedRegion: -1,
            myChart: null,
            qzmap: mapJson,
        }
    },

    mounted() {
        //页面初始化时进行EchartsDom渲染
        let _this = this
        let dom = this.$refs.myChart
        _this.myChart = echarts.init(dom)
        _this.$nextTick(() => {
            _this.initChart()
            bus.$on('map-change', name => {
                _this.selectedRegion = name
                _this.myChart.setOption(this.getMapOption())

                if (name === '衢州市') {
                    _this.myChart.dispatchAction({
                        type: 'unselect',
                        seriesIndex: 0,
                        dataIndex: Array.from({ length: mapJson.features.length }).map((item, index) => index),
                    })
                }
            })
        })
    },
    methods: {
        hrefFun(uri) {
            window.open(uri)
        },
        initChart() {
            let _this = this
            _this.myChart.on('mousemove', function(e) {
                _this.myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                })
                _this.myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: e.dataIndex,
                })
                _this.myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: e.dataIndex,
                })
            })
            //鼠标移出后先把上次的高亮取消
            _this.myChart.on('mouseout', function(e) {
                _this.myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: e.dataIndex,
                })
            })
            _this.myChart.hideLoading()
            _this.mapInitS(_this.qzmap)
        },
        getMapOption() {
            let option = {
                visualMap: {
                    show: false,
                },
                geo: [
                    {
                        map: 'quzhou', //地图为刚刚设置的China
                        aspectScale: 1, //长宽比
                        zoom: 1,
                        roam: false,
                        label: {
                            position: 'right',
                            show: false,
                            fontSize: 15,
                            color: '#fff',
                        },
                        emphasis: {
                            label: {
                                color: '#6FE7FF',
                            },
                            itemStyle: {
                                areaColor: '#2AB8FF',
                                borderWidth: 0,
                                color: 'green',
                                label: {
                                    show: false,
                                },
                            },
                        },
                        itemStyle: {
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#09132c', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#274d68', // 100% 处的颜色
                                    },
                                ],
                                globalCoord: true, // 缺省为 false
                            },
                            shadowColor: 'rgb(58,115,192)',
                            shadowOffsetX: 10,
                            shadowOffsetY: 11,
                        },
                    },
                ],
                series: [
                    {
                        type: 'map',
                        aspectScale: 1,
                        zoom: 1,
                        roam: false,
                        select: {
                            label: {
                                color: '#fff',
                            },
                            itemStyle: {
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            // color: '#299cd1', // 0% 处的颜色
                                            color: '#ff6600',
                                        },
                                        {
                                            offset: 1,
                                            // color: '#1e42a0', // 100% 处的颜色
                                            color: '#ff6600',
                                        },
                                    ],
                                    globalCoord: true, // 缺省为 false
                                },
                            },
                        },

                        label: {
                            show: true,
                            color: '#fff',
                            offset: [0, 0],
                            fontSize: 15,
                            formatter: params => {
                                if (params.name === this.selectedRegion) {
                                    return `{a|${params.name}}`
                                } else {
                                    return params.name
                                }
                            },
                            rich: {
                                a: {
                                    fontSize: 25,
                                    color: '#FFFFFF',
                                },
                            },
                        },
                        emphasis: {
                            label: {
                                color: '#fff',
                                fontSize: 20,
                            },
                            itemStyle: {
                                areaColor: '#2268b1',
                                borderWidth: 0.1,
                            },
                        },
                        itemStyle: {
                            borderColor: 'rgb(147, 235, 248)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#299cd1', // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: '#1e42a0', // 100% 处的颜色
                                    },
                                ],
                                globalCoord: true, // 缺省为 false
                            },
                            // normal: {
                            //     areaColor: '#f2d5ad',
                            //     // areaColor: "#ff3940",
                            //     //shadowBlur: 50,
                            //     //shadowColor: 'rgba(0, 0, 0, 0.2)',
                            //     borderColor: 'rgba(0, 0, 0, 0.2)',
                            // },
                            // emphasis: {
                            //     areaColor: '#ff6600',
                            //     shadowOffsetX: 0,
                            //     shadowOffsetY: 0,
                            //     borderWidth: 0,
                            // },
                        },
                        map: 'quzhou',
                    },
                ],
            }
            return option
        },
        //通过叠加多个二维地图实现渐变色
        mapInitS(geoJson) {
            let _this = this
            echarts.registerMap('quzhou', geoJson)
            let option = this.getMapOption()
            _this.myChart.setOption(option)
            //  监听
            _this.myChart.on('click', e => {
                // _this.selectedRegion = e.name
                // _this.myChart.setOption(this.getMapOption())
                bus.$emit('map-change', e.name)
            })
        },
    },
    components: {},
}
</script>

<style scoped="scoped">
.chartContent {
    position: relative;
    display: flex;
    justify-content: center;
    /* background-color: #08153a; */
}
</style>
