<!--
    图表 - echarts
-->
<template>
    <div class="my-echarts" :class="{ 'my-chart-disabled': disabled }">
        <div v-loading="loading" class="echarts-content" ref="echartsRef" :style="{ width, height }"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import * as echarts from 'echarts'
import merge from 'lodash/merge'

@Component({
    name: 'MyEcharts',
    components: {},
})
export default class MyEcharts extends Vue {
    /** 加载中... */
    @Prop({ default: () => false }) loading!: boolean
    /** 图表宽度，默认为 100% */
    @Prop({ default: () => '100%' }) width!: string
    /** 图表高度，默认为 400px */
    @Prop({ default: () => '400px' }) height!: string
    /** 图表配置项 */
    @Prop({ required: true, default: () => ({ series: {} }) }) option!: any
    /** 轮播配置 */
    @Prop({ default: false }) autoplay!: boolean
    @Prop({ default: 3 }) autoDuration!: number
    @Prop({ default: false }) disabled!: boolean
    @Prop({ default: 0 }) dataLen!: number
    @Prop({ default: true }) clear!: boolean
    @Prop({ default: 0 }) loopAnimation!: number
    /** 图表实例 */
    public myChart: any = null
    // @Watch('option',{immediate: true,deep: true})
    @Watch('option', { deep: true })
    optionHandler(newVal: any, oldVal: any) {
        this.drawChart()
        this.handleAutoPlay()
    }
    created() {}
    mounted() {
        this.init()
        window.addEventListener('resize', this.resizeEcharts)
    }
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeEcharts)
        this.timerLoop && clearInterval(this.timerLoop)
    }
    /** 初始化 */
    public init() {
        if (!this.myChart) {
            const chartEl: any = this.$refs.echartsRef
            this.myChart = echarts.init(chartEl)
            // console.log('*************', this.autoplay)
            if (this.autoplay) {
                this.carouselEcharts()
                this.playEvents()
            }
        }
        this.drawChart()
    }
    handleAutoPlay() {
        if (this.autoplay) {
            this.carouselIndex = 0
            clearInterval(this.dispatTimer)
            this.carouselEcharts()
        }
    }
    timerLoop: any = null
    /**
     * 画图
     * @param {*} options 图表配置项，默认不传
     */
    optionBase = {}
    public drawChart(options?: any) {
        // 1、清除画布
        if (this.clear) {
            this.myChart.clear()
        }
        // 2、设置 option
        const opt: any = options || this.option
        this.option = opt
        // console.log('this.option :>> ', this.option)
        // console.log('chart-options :>> ', opt)
        // 3、画图
        if (this.timerLoop) {
            clearInterval(this.timerLoop)
        }
        const chartConfig = merge({}, this.optionBase, opt)
        this.myChart.setOption(chartConfig)
        /**此处执行该方法会导致echart无过度动画 */
        // this.resizeEcharts()
        if (this.loopAnimation && !this.autoplay) {
            this.timerLoop = setInterval(() => {
                this.myChart.clear()
                this.myChart.setOption(chartConfig)
            }, this.loopAnimation * 1000)
        }
    }
    /**
     * 调整图表大小
     */
    public resizeEcharts() {
        this.myChart && this.myChart.resize()
    }
    carouselIndex = 0
    dispatTimer: any = null
    handleEmitData(index: number) {
        const { series } = this.option
        let data: any = {}
        if (Array.isArray(series)) {
            data = series
        } else {
            data = series.data[index]
        }
        if (!data) return
        this.$emit('getIndex', index)
        this.$emit('autoplay', {
            data,
            $index: index,
        })
    }
    carouselEcharts() {
        /**
         * carouselIndex  当前轮播下标
         * dataLen  传入echarts的options数据有几项
         */
        // 获取echarts实例
        const myChart = this.myChart
        const fnAnim = () => {
            // console.log(this.carouselIndex)
            this.handleEmitData(this.carouselIndex)
            // 高亮
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: this.carouselIndex,
            })
            // 取消高亮
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: this.carouselIndex === 0 ? this.dataLen - 1 : this.carouselIndex - 1,
            })
            this.carouselIndex++

            if (this.carouselIndex >= this.dataLen) {
                this.carouselIndex = 0
            }
        }
        fnAnim()
        this.dispatTimer = setInterval(fnAnim, this.autoDuration * 1000)
    }
    playEvents() {
        const myChart = this.myChart
        // 鼠标移上去时停止轮播
        if (this.disabled) return
        myChart.on('mouseover', (ev: any) => {
            this.handleEmitData(ev.dataIndex)
            clearInterval(this.dispatTimer)
            this.dispatTimer = null
            // 修复停止轮播时的那一项 鼠标移上去时无响应
            if (ev.dataIndex === this.carouselIndex - 1) {
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: ev.dataIndex,
                })
            } else {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: this.carouselIndex === 0 ? this.dataLen - 1 : this.carouselIndex - 1,
                })
            }
        })
        // 鼠标移出图表时取消当前高亮并停止轮播
        myChart.on('globalout', () => {
            this.carouselIndex = 0
            clearInterval(this.dispatTimer)
            this.carouselEcharts()
        })
    }
}
</script>

<style lang="less" scoped>
.my-echarts {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.my-chart-disabled {
    pointer-events: none;
}
</style>
