<template>
    <div ref="chart" class="content" :style="[myStyle, chartStyle]"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import * as echarts from 'echarts'
import { ECharts, EChartsOption } from 'echarts'

@Component({
    name: 'SgBaseChart',
})
export default class SgBaseChart extends Vue {
    /** echarts实例 */
    private myChart!: ECharts

    /** 自定义样式 */
    @Prop({
        type: Object,
        default: () => ({}),
    })
    readonly chartStyle!: Record<string, any>

    /** echarts配置项 */
    @Prop({
        type: Object,
        default: () => ({}),
    })
    readonly option!: EChartsOption

    /** 合并配置方法 */
    @Prop({
        type: Function,
        default: (defaultOption: EChartsOption = {}, option: EChartsOption = {}) => ({
            ...defaultOption,
            ...option,
        }),
    })
    readonly getOption!: (defaultOption: EChartsOption, option: EChartsOption) => EChartsOption

    /** 默认配置项 */
    @Prop({
        type: Object,
        default: () => ({}),
    })
    readonly defaultOption!: EChartsOption

    /** 基础样式 */
    private myStyle = {
        height: '300px',
    }

    /** 初始化echarts实例 */
    private init(): void {
        const $chart = this.$refs.chart as HTMLElement
        this.myChart = echarts.init($chart)
    }

    /** 绘制图表 */
    private drawChart(): void {
        const options = this.getOption(this.defaultOption, this.option)
        // 第二个参数notMerge 不许和上次的legend合并
        this.myChart.setOption(options, true)
    }

    /** 重置图表大小 */
    private resizeChart(): void {
        this.myChart?.resize()
    }

    @Watch('option', { deep: true })
    private onOptionChange(): void {
        this.$nextTick(() => {
            this.drawChart()
        })
    }

    activated(): void {
        // 原因是组件keepAlive后切换到其他页面，resize生效后宽度获取不到 因此为0 导致切回来看不见图表
        // 重新计算宽度 防止缩放后图表过小过着过大
        this.resizeChart()
    }

    mounted(): void {
        this.$nextTick(() => {
            this.init()
            this.drawChart()
        })
    }
}
</script>
