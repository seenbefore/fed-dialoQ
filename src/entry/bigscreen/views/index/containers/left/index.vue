<template>
    <div class="left_content">
        <div class="part_one_div">
            <div class="part_title_div">
                <div class="title_icon_div"><img src="../../assets/title_item_icon.png" alt="" /></div>
                <div class="title_text_div">
                    <span class="zhifashixiang">执法事项</span>
                    <!-- <span @click="checkDetailFun('shixiang')" class="detail_span">详情</span> -->
                </div>
            </div>
            <div class="part_one_top">
                <div class="one_top_item bg_1">
                    <p class="item_num"><my-count-to :end-val="exRow['检查事项']"></my-count-to></p>
                    <p class="item_title">检查事项</p>
                </div>
                <div class="one_top_item bg_2">
                    <p class="item_num"><my-count-to :end-val="exRow['处罚事项']"></my-count-to></p>
                    <p class="item_title">处罚事项</p>
                </div>
                <div class="one_top_item bg_3">
                    <p class="item_num"><my-count-to :end-val="exRow['强制事项']"></my-count-to></p>
                    <p class="item_title">强制事项</p>
                </div>
                <div class="one_top_item bg_4">
                    <p class="item_num"><my-count-to :end-val="exRow['其他事项']"></my-count-to></p>
                    <p class="item_title">其他事项</p>
                </div>
            </div>
            <div class="part_one_bottom">
                <div class="bottom_title">高频事项Top5</div>
                <div class="bottom_chart">
                    <transverse-bar
                        :class="transverseBarConfig.class"
                        :id="transverseBarConfig.id"
                        :height="transverseBarConfig.height"
                        :width="transverseBarConfig.width"
                        :chart-data="exRow['高频事项']"
                    ></transverse-bar>
                </div>
            </div>
        </div>
        <div class="part_two_div">
            <div class="part_title_div">
                <div class="title_icon_div"><img src="../../assets/title_item_icon.png" alt="" /></div>
                <div class="title_text_div">
                    <span class="zhifashixiang">执法力量</span>
                    <!-- <span @click="checkDetailFun('liliang')" class="detail_span">详情</span> -->
                </div>
            </div>
            <div class="part_two_top">
                <div class="two_top_item li_bg_1">
                    <p class="top_item_title">执法证件持有人</p>
                    <p class="top_item_num">{{ exRow['执法证件持有人数'] }}</p>
                </div>
                <div class="two_top_item li_bg_2">
                    <p class="top_item_title">「1+5」执法队员</p>
                    <p class="top_item_num">{{ exRow['1+5执法队员人数'] }}</p>
                </div>
            </div>
            <div class="part_two_bottom">
                <div class="part_two_left_data">
                    <div class="botom_top">
                        <span class="font_top_col">{{ exRow['市级执法证件持有人数'] }}</span>
                        <span class="b_t_title">市级</span>
                    </div>
                    <div class="botom_center">
                        <span class="font_center_col">{{ exRow['区县执法证件持有人数'] }}</span>
                        <span class="b_t_title">区县</span>
                    </div>
                    <div class="botom_bottom">
                        <span class="font_bottom_col">{{ exRow['乡镇执法证件持有人数'] }}</span>
                        <span class="b_t_title">乡镇</span>
                    </div>
                </div>
                <div class="part_two_right_data">
                    <div class="botom_top">
                        <span class="b_t_title">市级</span>
                        <span class="font_top_col">{{ exRow['市级1+5执法队员人数'] }}</span>
                    </div>
                    <div class="botom_center">
                        <span class="b_t_title">区县</span>
                        <span class="font_center_col">{{ exRow['区县1+5执法队员人数'] }}</span>
                    </div>
                    <div class="botom_bottom">
                        <span class="b_t_title">乡镇</span>
                        <span class="font_bottom_col">{{ exRow['乡镇1+5执法队员人数'] }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="part_three_div">
            <div class="part_title_div">
                <div class="title_icon_div"><img src="../../assets/title_item_icon.png" alt="" /></div>
                <div class="title_text_div">
                    <span class="zhifashixiang">执法活动</span>
                    <!-- <span class="detail_span">详情</span> -->
                </div>
            </div>
            <div class="part_three_top">
                <div class="three_top_item">
                    <p class="three_item_title">执法监管计划(条)</p>
                    <p class="three_item_num">
                        <my-count-to :end-val="exRow['执法监管计划']"></my-count-to>
                        <!-- {{ exRow['执法监管计划'] }} -->
                    </p>
                </div>
                <div class="three_top_item">
                    <p class="three_item_title">执法协作数</p>

                    <p class="three_item_num">
                        <my-count-to :end-val="exRow['执法协作数']"></my-count-to>
                        <!-- {{ exRow['执法协作数'] }} -->
                    </p>
                </div>
                <div @click="hrefFun('cha')" class="three_top_item cur_class">
                    <p class="three_item_title">案件办理数</p>
                    <p class="three_item_num">
                        <my-count-to :end-val="exRow['案件办理数']"></my-count-to>
                        <!-- {{ exRow['案件办理数'] }} -->
                    </p>
                </div>
            </div>
            <div class="part_three_bottom">
                <div class="three_bottom_title">案件领域分布</div>
                <my-echarts v-bind="barChartConfig"></my-echarts>
            </div>
        </div>
    </div>
</template>
<script>
import { bus } from '../../bus'
import TransverseBar from '../components/transverse-bar.vue'
import { getSingleBarOptions, myMixins } from '../helper'
export default {
    mixins: [myMixins],
    components: {
        TransverseBar,
    },
    computed: {
        barChartConfig() {
            const data = this.row['案件领域分布'] || []
            return {
                class: 'bar-chart',
                height: '180px',
                width: '100%',
                option: getSingleBarOptions(data),
            }
        },
    },
    data() {
        return {
            transverseBarConfig: {
                id: 'homeDrumBar',
                class: 'homeDrumBar',
                height: '170px',
                width: '100%',
            },
        }
    },

    methods: {},
}
</script>
<style scoped lang="less"></style>
