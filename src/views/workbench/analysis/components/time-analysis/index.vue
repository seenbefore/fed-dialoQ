<template>
    <el-card shadow="never" class="time-analysis" :body-style="{ padding: '20px' }">
        <div class="card-header">
            <div class="title">访问时段分析</div>
        </div>
        <div class="chart-container">
            <Chart :option="getChartOption" height="360px" />
        </div>
    </el-card>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Chart from '@/components/Chart/index.vue'

@Component({
    name: 'TimeAnalysis',
    components: {
        Chart,
    },
})
export default class TimeAnalysis extends Vue {
    @Prop({ type: Array, default: () => [] }) readonly data!: number[]

    get getChartOption() {
        return {
            tooltip: {
                trigger: 'axis',
                formatter: '{b}:00 {c}',
            },
            grid: {
                top: 10,
                right: 10,
                bottom: 20,
                left: 40,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: Array.from({ length: 24 }, (_, i) => i),
                axisLine: {
                    lineStyle: {
                        color: '#E5E6EB',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#86909C',
                },
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: '#E5E6EB',
                        type: 'dashed',
                    },
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#86909C',
                },
            },
            series: [
                {
                    data: this.data,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        color: '#165DFF',
                    },
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
                                    color: 'rgba(22,93,255,0.15)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(22,93,255,0.01)',
                                },
                            ],
                        },
                    },
                },
            ],
        }
    }
}
</script>

<style lang="less" scoped>
.time-analysis {
    height: 440px;
    border: none;
    border-radius: 0;
    background: #fff;

    .card-header {
        margin-bottom: 16px;

        .title {
            font-size: 16px;
            font-weight: 500;
            color: #1d2129;
        }
    }

    .chart-container {
        height: 360px;
    }
}
</style>
