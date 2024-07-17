<template>
    <div class="center_content">
        <div class="center_title_div">
            <div class="title_span_div"><span>执法效能</span></div>
            <div class="title_img_div"><img src="../../assets/xiaoneng_title_bg.png" alt="" /></div>
            <div class="title_line_div"></div>
        </div>
        <div class="center_data_div">
            <div class="center_left_div">
                <div class="data_item_div xiaoneng_bg1">
                    <div class="xiaoneng_num">{{ exRow['计划完成率'] }}</div>
                    <div class="xiaoneng_unit">%</div>
                    <div class="xiaoneng_title">计划完成率</div>
                </div>
                <div class="data_item_div xiaoneng_bg2">
                    <div class="xiaoneng_num">{{ exRow['线索处置率'] }}</div>
                    <div class="xiaoneng_unit">%</div>
                    <div class="xiaoneng_title">线索处置率</div>
                </div>
                <div class="data_item_div xiaoneng_bg3">
                    <div class="xiaoneng_num">{{ exRow['联合执法响应率'] }}</div>
                    <div class="xiaoneng_unit">%</div>
                    <div class="xiaoneng_title">联合执法响应率</div>
                </div>
                <div class="data_item_div xiaoneng_bg4">
                    <div class="xiaoneng_num">{{ exRow['案件结案率'] }}</div>
                    <div class="xiaoneng_unit">%</div>
                    <div class="xiaoneng_title">案件结案率</div>
                </div>
            </div>
            <div class="center_center_div">
                <div class="center_right_title subtitle">事件动态</div>
                <my-pool-list v-bind="poolConfig"></my-pool-list>
            </div>
            <div class="center_right_div">
                <div class="center_right_title subtitle">事件来源分布</div>
                <my-echarts v-bind="barChartConfig"></my-echarts>
            </div>
        </div>
    </div>
</template>
<script>
import { getSingleBarOptions, myMixins } from '../helper'
export default {
    mixins: [myMixins],
    components: {},
    computed: {
        poolConfig() {
            const data = this.row['事件动态展示'] || []
            const result = {
                key: JSON.stringify(data),
                data: data,
                width: '100%',
                height: '160px',
                border: true,
                thead: true,
                config: {
                    // autoPlay: false,
                    step: 0.3, // 数值越大速度滚动越快
                },
                columns: [
                    {
                        prop: 'name',
                        label: '序号',
                        width: '50px',
                        align: 'left',
                        // render: (h, { row, index }) => {
                        //     return index + 1
                        // },
                    },
                    {
                        prop: 'value',
                        label: '标题',
                        minWidth: '120px',
                        align: 'left',
                    },
                    {
                        prop: 'value2',
                        label: '相关部门',
                        width: '100px',
                        align: 'left',
                    },
                ],
            }
            return result
        },
        barChartConfig() {
            const data = this.row['事件来源分布'] || []
            return {
                class: 'bar-chart',
                height: '180px',
                width: '100%',
                option: getSingleBarOptions(data),
            }
        },
    },
    data() {
        return {}
    },
    created() {},

    methods: {},
}
</script>
<style scoped lang="less">
.subtitle {
    color: #c0e7ff;
    line-height: 30px;
}
</style>
