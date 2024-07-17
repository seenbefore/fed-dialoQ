<!--
   pie-legend - 组件
   左边饼图，右边图例组合块
-->
<template>
    <div class="my-pie-legend sg-flexbox align-center justify-center">
        <div class="pie-wrap sg-m-r-24">
            <my-echarts class="pie-echarts" :width="pieWidth" :height="pieHeight" :option="chartOption" v-bind="$attrs" @getIndex="getIndex" />
            <slot name="pie"></slot>
        </div>
        <div class="legend-wrap">
            <my-legend-group :colors="colors" :custom-rate="customRate" :list="list" v-bind="$attrs" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IPieLegend } from '../../../../types/index'
import _ from 'lodash'

@Component({
    name: 'MyPieLegend',
    components: {},
})
export default class MyPieLegend extends Vue {
    /** pie图表宽度，默认为 200px */
    @Prop({ default: () => '200px' }) pieWidth!: string
    /** pie图表高度，默认为 200px */
    @Prop({ default: () => '200px' }) pieHeight!: string
    /** 颜色配置项 */
    @Prop({ default: () => [] }) colors!: string[]
    /** legend数据 */
    @Prop({ default: () => [] }) list!: IPieLegend[]
    /** 是否自定义百分比 */
    @Prop({ default: false }) customRate!: boolean
    @Prop({ default: () => {} }) option!: Record<string, any>
    get legendList() {
        return this.list?.map((item: any) => ({
            ...item,
            title: item.name,
            number: item.value,
        }))
    }
    get chartOption() {
        const option = {
            color: this.colors,
            series: [
                {
                    name: '风险预警',
                    type: 'pie',
                    radius: ['90%', '72%'],
                    avoidLabelOverlap: false,
                    // 圆圈边框配置
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#081940',
                    },
                    legend: { type: 'scroll' },
                    labelLine: {
                        show: false,
                    },
                    label: {
                        show: false,
                        position: 'center',
                    },
                    splitLine: {
                        length: 15,
                        lineStyle: {
                            width: 2,
                            color: '#999',
                        },
                    },
                    emphasis: {
                        itemStyle: {
                            color: ['#4983f5', '#9259f0', '#3db9d2'],
                        },
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                            // color: 'rgba(255,255,255, 0.7)',
                            formatter(params: any) {
                                const { name, percent } = params
                                return `${name}:\n${percent}%`
                            },
                        },
                    },
                    data: this.list?.map((item: any) => ({
                        ...item,
                        name: item.title,
                        value: item.number,
                    })),
                },
            ],
        }
        console.log('pie-base-option :>> ', option)
        const _option = _.merge({}, option, this.option)
        console.log('pie-result-option :>> ', _option)
        return _option
    }
    @Watch('list', { deep: true })
    listHandler(val: any) {}
    created() {}
    mounted() {}
    getIndex(index: number) {
        this.$emit('getIndex', index)
    }
}
</script>

<style lang="less" scoped>
.pie-wrap {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: center;
    width: 180px;
    height: 180px;
}

::v-deep .my-legend-group {
    .text-item--title {
        min-width: 120px;
        letter-spacing: 0;
    }

    .text-item__right {
        min-width: 90px;
    }
}
</style>
