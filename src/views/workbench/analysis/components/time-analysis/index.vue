<template>
    <el-card shadow="hover" class="time-analysis">
        <div slot="header">访问时段分析</div>
        <Chart :option="getChartOption" style="height: 400px;" />
    </el-card>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Chart from '@/components/Chart/index.vue'

interface TimeData {
    time: string
    value: number
}

@Component({
    name: 'TimeAnalysis',
    components: {
        Chart,
    },
})
export default class TimeAnalysis extends Vue {
    /** 时段数据 */
    @Prop({ type: Array, default: () => [] }) readonly data!: TimeData[]

    get getChartOption() {
        return {
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    const data = params[0]
                    return `${data.name}<br/>${data.value} 次访问`
                },
            },
            grid: {
                top: 30,
                right: 20,
                bottom: 30,
                left: 50,
            },
            xAxis: {
                type: 'category',
                data: this.data.map(item => item.time),
                axisLine: {
                    lineStyle: {
                        color: '#909399',
                    },
                },
                axisLabel: {
                    color: '#606266',
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#606266',
                },
                splitLine: {
                    lineStyle: {
                        color: '#EBEEF5',
                    },
                },
            },
            series: [
                {
                    data: this.data.map(item => item.value),
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(128, 100, 255, 0.5)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(128, 100, 255, 0.1)',
                                },
                            ],
                        },
                    },
                    lineStyle: {
                        color: '#8064ff',
                        width: 2,
                    },
                },
            ],
        }
    }
}
</script>

<style lang="less" scoped>
.time-analysis ::v-deep {
    height: 100%;
}
</style>
