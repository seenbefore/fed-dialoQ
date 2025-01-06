<template>
    <el-card shadow="never" class="overview-card" :class="cardType" :body-style="{ padding: '20px', height: '100%' }">
        <div class="data-item">
            <div class="left">
                <div class="title">{{ title }}</div>
                <div class="value" :class="{ small: true }">{{ formatNumber(value) }}</div>
                <div class="trend" :class="trend">
                    <span>{{ trendText }}</span>
                    <i v-if="!isDonut" class="el-icon-caret-bottom"></i>
                </div>
            </div>
            <div class="right">
                <Chart v-if="!isDonut" :option="getLineChartOption" style="width: 200px; height: 80px;" />
                <Chart v-else :option="getDonutChartOption" style="width: 160px; height: 80px;" />
            </div>
        </div>
    </el-card>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Chart from '@/components/Chart/index.vue'

@Component({
    name: 'OverviewCard',
    components: {
        Chart,
    },
})
export default class OverviewCard extends Vue {
    @Prop({ type: String, required: true }) readonly title!: string
    @Prop({ type: [Number, String], required: true }) readonly value!: number | string
    @Prop({ type: String, required: true }) readonly trendText!: string
    @Prop({ type: String, default: 'down' }) readonly trend!: string
    @Prop({ type: Array, default: () => [] }) readonly chartData!: number[]
    @Prop({ type: String, default: 'visits' }) readonly cardType!: string
    @Prop({ type: Array, default: () => [] }) readonly donutData!: Array<{ name: string; value: number }>

    get isDonut() {
        return this.cardType === 'donut'
    }

    get chartColor() {
        const colors = {
            visits: '#f56c6c',
            ip: '#67c23a',
            stats: '#409eff',
            donut: '#8777ff',
        }
        return colors[this.cardType] || colors.visits
    }

    get chartBgColor() {
        const colors = {
            visits: '#fff5f5',
            ip: '#f0f9eb',
            stats: '#ecf5ff',
            donut: '#f5f5ff',
        }
        return colors[this.cardType] || colors.visits
    }

    get getLineChartOption() {
        return {
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    const [param] = params
                    return `${param.name}<br/>${this.title} ${param.value}`
                },
                axisPointer: {
                    type: 'none',
                },
            },
            grid: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                containLabel: false,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                show: false,
                data: ['2024-06', '2024-07', '2024-08', '2024-09', '2024-10'],
            },
            yAxis: {
                type: 'value',
                show: false,
                scale: true,
            },
            series: [
                {
                    data: this.chartData,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    symbolSize: 0,
                    lineStyle: {
                        width: 2,
                        color: this.chartColor,
                    },
                },
            ],
        }
    }

    get getDonutChartOption() {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 'middle',
                itemWidth: 6,
                itemHeight: 6,
                icon: 'circle',
                itemGap: 12,
                textStyle: {
                    fontSize: 12,
                    color: '#666',
                },
                formatter: (name: string) => {
                    const data = this.donutData.find(item => item.name === name)
                    return `${name}`
                },
            },
            series: [
                {
                    type: 'pie',
                    radius: ['70%', '90%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#fff',
                    },
                    data: this.donutData,
                    emphasis: {
                        scale: false,
                        scaleSize: 0,
                    },
                    color: ['#8b7aff', '#165dff', '#36cfc9'],
                },
            ],
        }
    }

    private formatNumber(num: number | string): string {
        if (typeof num === 'string') return num
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
}
</script>

<style lang="less" scoped>
.overview-card {
    background: #fff;
    border-radius: 8px;
    height: 136px;
    border: none;
    overflow: visible;

    &.ip {
        background: #f0f9eb;
    }

    &.visits {
        background: #fff5f5;
    }

    &.stats {
        background: #ecf5ff;
    }

    &.donut {
        background: #f5f5ff;
    }

    ::v-deep {
        .el-card {
            border: none;
            overflow: visible;
        }

        .el-card__body {
            height: 100%;
        }

        .data-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            height: 100%;

            .left {
                flex: 0 0 auto;
                padding-right: 12px;
                min-width: 90px;
            }

            .right {
                flex: 1;
                width: 120px;
                height: 80px;
                margin: 10px -8px -10px 0;
                display: flex;
                justify-content: flex-end;

                &:has(> div > div[_echarts_instance_]) {
                    width: 160px;
                    height: 80px;
                    margin: -10px -8px -10px 0;
                }
            }

            .title {
                font-size: 14px;
                color: #909399;
                margin-bottom: 4px;
                font-weight: normal;
            }

            .value {
                font-size: 36px;
                font-weight: 500;
                color: #000000;
                margin-bottom: 4px;
                line-height: 1.1;

                &.small {
                    font-size: 24px;
                }
            }

            .trend {
                font-size: 13px;
                display: flex;
                align-items: center;
                color: #f56c6c;

                &.up {
                    color: #67c23a;
                    i {
                        transform: rotate(180deg);
                    }
                }

                span {
                    margin-right: 4px;
                }

                i {
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
