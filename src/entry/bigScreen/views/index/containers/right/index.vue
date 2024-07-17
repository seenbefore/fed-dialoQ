<template>
    <div class="right_content">
        <div class="part_one_div">
            <div class="part_title_div">
                <div class="title_icon_div"><img src="../../assets/title_item_icon.png" alt="" /></div>
                <div class="title_text_div">
                    <span class="zhifashixiang">执法保障</span>
                    <!-- <span class="detail_span">详情</span> -->
                </div>
            </div>
            <div class="part_one_content">
                <div class="content_box_div">
                    <div class="content_item_div item_bg1">
                        <p class="baozhang_item_title">法制审核力量</p>
                        <p class="baozhang_item_num">
                            <my-count-to :end-val="exRow['法制审核力量']"></my-count-to>
                        </p>
                    </div>
                    <div class="content_item_div item_bg2">
                        <p class="baozhang_item_title">培训覆盖率</p>
                        <p class="baozhang_item_num">
                            <my-count-to :end-val="exRow['培训覆盖率']" unit="%"></my-count-to>
                        </p>
                    </div>
                </div>
                <div class="content_box_div">
                    <div class="content_item_div item_bg3">
                        <p class="baozhang_item_title">规范化建设</p>
                        <p class="baozhang_item_num"><my-count-to :end-val="exRow['规范化建设']"></my-count-to></p>
                    </div>
                    <div class="content_item_div item_bg4">
                        <p class="baozhang_item_title">装备配比率</p>
                        <p class="baozhang_item_num"><my-count-to :end-val="exRow['装备配比率']" unit="%"></my-count-to></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="part_two_div">
            <div class="part_title_div">
                <div class="title_icon_div"><img src="../../assets/title_item_icon.png" alt="" /></div>
                <div class="title_text_div">
                    <span class="zhifashixiang">执法监督</span>
                    <!-- <span class="detail_span">详情</span> -->
                </div>
            </div>
            <div class="part_two_top_div">
                <!-- <div class="top_item_one">
                    <div class="top_div_title">执法监督问题</div>
                    <div class="one_content">
                        <div>
                            <span class="jiandu_title">司法建议书</span>
                            <span class="jiandu_span">0</span>
                        </div>
                        <div>
                            <span class="jiandu_title">检查建议书</span>
                            <span class="jiandu_span">1</span>
                        </div>
                    </div>
                </div>
                <div class="top_item_two">
                    <div class="top_div_title">违法违纪</div>
                    <div class="one_content">
                        <div>
                            <span class="jiandu_title">违法违纪</span>
                            <span class="jiandu_span">0</span>
                        </div>
                        <div>
                            <span class="jiandu_title">追责</span>
                            <span class="jiandu_span">0</span>
                        </div>
                    </div>
                </div>
                <div class="top_item_three">
                    <div class="top_div_title">纠错败诉</div>
                    <div class="one_content">
                        <div>
                            <span class="jiandu_title">纠错</span>
                            <span class="jiandu_span">0</span>
                        </div>
                        <div>
                            <span class="jiandu_title">败诉</span>
                            <span class="jiandu_span">0</span>
                        </div>
                    </div>
                </div> -->
                <div class="top_item_four">
                    <div class="top_div_title">监督线索数</div>
                    <div class="one_content">
                        <div style="color:#ffd400;">{{ exRow['监督线索数'] }}</div>
                    </div>
                </div>
                <div class="top_item_four">
                    <div class="top_div_title">监督处置数</div>
                    <div class="one_content">
                        <div style="color:#00ff80;">{{ exRow['监督处置数'] }}</div>
                    </div>
                </div>
                <div class="top_item_four" style="width:240px;">
                    <div class="top_div_title">监督处置率</div>
                    <div class="one_content">
                        <div style="color:#00ffff;">{{ exRow['监督处置率'] }}%</div>
                    </div>
                </div>
            </div>
            <div class="part_two_bottom_div" style="padding: 20px;padding-top: 40px;">
                <my-base-tab v-bind="tabOption" v-model="activeTab" :row-span="4"></my-base-tab>
                <my-pool-list v-bind="poolConfig1" v-if="activeTab == '未完成事件'" :key="poolConfig1.key"></my-pool-list>
                <my-pool-list v-bind="poolConfig2" v-if="activeTab == '未完成计划'" :key="poolConfig2.key"></my-pool-list>
                <my-pool-list v-bind="poolConfig3" v-if="activeTab == '临期事件'" :key="poolConfig3.key"></my-pool-list>
                <my-pool-list v-bind="poolConfig4" v-if="activeTab == '临期计划'" :key="poolConfig4.key"></my-pool-list>
                <!-- <pie-chart :class="pieChartConfig.class" :id="pieChartConfig.id" :height="pieChartConfig.height" :width="pieChartConfig.width"></pie-chart> -->
            </div>
        </div>
        <div class="part_three_div">
            <div class="part_title_div">
                <div class="title_icon_div"><img src="../../assets/title_item_icon.png" alt="" /></div>
                <div class="title_text_div">
                    <span class="zhifashixiang">执法风险预警</span>
                    <!-- <span class="detail_span">详情</span> -->
                </div>
            </div>
            <div class="duixaing_pl_div1" style="display:flex;">
                <div style="padding-top: 30px;padding-left:50px;">
                    <my-echarts v-bind="pieChartConfig" class="pie-chart"></my-echarts>
                </div>
                <div style="flex:1;padding-left:40px;padding-top: 60px;">
                    <my-legend-group v-bind="pieChartConfig" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getPieOptions, myMixins } from '../helper'
/** 饼图颜色 */
export const pieColors = ['#C6A56A', '#5C90F6', '#3BBCD6', '#FF8856', '#8894B9']

export default {
    mixins: [myMixins],
    components: {},
    computed: {
        pieChartConfig() {
            const data = this.exRow['执法风险预警'] || []

            const list = data.map(item => {
                const { name, value } = item
                return {
                    title: name,
                    number: value,
                }
            })
            return {
                colors: pieColors,
                list,
                customRate: true,
                height: '170px',
                width: '170px',
                option: getPieOptions(data, {
                    colors: pieColors,
                }),
            }
        },
        poolConfig1() {
            const data = this.row['未完成事件'] || []
            return {
                key: JSON.stringify(data) + '未完成事件',
                data,
                width: '100%',
                height: '130px',
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
                        width: '120px',
                        align: 'left',
                    },
                ],
            }
        },
        poolConfig2() {
            const data = this.row['未完成计划'] || []
            return {
                key: JSON.stringify(data) + '未完成计划',
                data,
                width: '100%',
                height: '130px',
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
                        width: '120px',
                        align: 'left',
                    },
                ],
            }
        },
        poolConfig3() {
            const data = this.row['临期事件'] || []
            return {
                key: JSON.stringify(data) + '临期事件',
                data,
                width: '100%',
                height: '130px',
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
                        width: '120px',
                        align: 'left',
                    },
                ],
            }
        },
        poolConfig4() {
            const data = this.row['临期计划'] || []
            return {
                key: JSON.stringify(data) + '临期计划',
                data,
                width: '100%',
                height: '130px',
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
                        width: '120px',
                        align: 'left',
                    },
                ],
            }
        },
    },
    data() {
        return {
            /** 饼图颜色 */
            pieColors: pieColors,
            activeTab: '未完成事件',
            tabOption: {
                list: [
                    {
                        label: '未完成事件',
                        value: '未完成事件',
                    },
                    {
                        label: '未完成计划',
                        value: '未完成计划',
                    },
                    {
                        label: '临期事件',
                        value: '临期事件',
                    },
                    {
                        label: '临期计划',
                        value: '临期计划',
                    },
                ],
            },
        }
    },

    methods: {},
}
</script>
<style scoped lang="less">
::v-deep {
    .pie-chart {
        position: relative;
        border: 2px solid #3969ae;
        border-radius: 100%;
        background: url('../../assets/chilun.svg') no-repeat center center;
    }
    .baozhang_item_num {
        .font16 {
            font-size: 24px;
        }
    }
}
</style>
