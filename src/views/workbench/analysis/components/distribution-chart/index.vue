<template>
    <el-card shadow="hover" class="distribution-chart">
        <div slot="header">{{ title }}</div>
        <Chart :option="getChartOption" style="height: 300px;" />
    </el-card>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Chart from '@/components/Chart/index.vue'

interface DistributionData {
    name: string
    value: number
}

@Component({
    name: 'DistributionChart',
    components: {
        Chart,
    },
})
export default class DistributionChart extends Vue {
    /** 图表标题 */
    @Prop({ type: String, required: true }) readonly title!: string
    /** 分布数据 */
    @Prop({ type: Array, default: () => [] }) readonly data!: DistributionData[]
    /** 图表颜色 */
    @Prop({ type: Array, default: () => ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399'] }) readonly colors!: string[]

    get getChartOption() {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}%',
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 'center',
                itemWidth: 10,
                itemHeight: 10,
                icon: 'circle',
                formatter: (name: string) => {
                    const item = this.data.find(d => d.name === name)
                    return `${name}: ${item ? item.value : 0}%`
                },
            },
            color: this.colors,
            series: [
                {
                    name: this.title,
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['40%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold',
                        },
                    },
                    data: this.data,
                },
            ],
        }
    }
}
</script>

<style lang="less" scoped>
.distribution-chart ::v-deep {
    height: 100%;
}
</style>
