<template>
    <el-card shadow="hover" class="geo-distribution">
        <div slot="header">
            <span>地理位置分布</span>
            <el-radio-group v-model="currentView" size="small" style="float: right;">
                <el-radio-button label="china">中国</el-radio-button>
                <el-radio-button label="world">世界</el-radio-button>
            </el-radio-group>
        </div>
        <Chart :option="getChartOption" style="height: 400px;" />
    </el-card>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Chart from '@/components/Chart/index.vue'

interface RegionData {
    name: string
    value: number
}

@Component({
    name: 'GeoDistribution',
    components: {
        Chart,
    },
})
export default class GeoDistribution extends Vue {
    /** 地区数据 */
    @Prop({ type: Array, default: () => [] }) readonly data!: RegionData[]

    private currentView = 'china'

    @Watch('currentView')
    onViewChange() {
        this.$emit('view-change', this.currentView)
    }

    get getChartOption() {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}',
            },
            visualMap: {
                min: 0,
                max: 100000,
                text: ['高', '低'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['#e0f3f8', '#2a5674'],
                },
            },
            series: [
                {
                    name: '访问量',
                    type: 'map',
                    map: this.currentView,
                    emphasis: {
                        label: {
                            show: true,
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
.geo-distribution ::v-deep {
    height: 100%;
}
</style>
