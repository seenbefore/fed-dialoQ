<!-- 查看详情 -->
<template>
    <div class="sg-page WorkbenchDoneDetail">
        <div class="ic-row column ic-h-100">
            <el-card class="my-card">
                <div slot="header" class="ic-row middle">
                    <div class="ic-col-flex-1 ic-row middle">
                        <span class="ic-font-20 ic-bold ic-mr-4">查看详情</span>
                    </div>
                    <el-button style="padding: 3px 0" type="text" @click="$router.go(-1)">
                        <div class="ic-row middle">
                            <img src="@/entry/third/assets/返回.svg" alt="" class="ic-mr-1" />
                            <span>返回</span>
                        </div>
                    </el-button>
                </div>
            </el-card>
            <el-card class="my-card ic-mt-2 ic-col-flex-1 detail">
                <div class="ic-row body">
                    <div class="main  ic-col-flex-1"></div>
                    <div class="side">
                        <div class="ic-box" style="padding:15px 15px;">
                            <div class="ic-row">
                                <div class="ic-headline ic-col-flex-1">
                                    <div class="ic-line"></div>
                                    <div class="title">
                                        <span class=" ic-font-16">审批日志</span>
                                    </div>
                                </div>
                                <div>
                                    <el-button type="text" size="mini">查看流程图</el-button>
                                </div>
                            </div>
                            <div class="" style="padding-left:2px;padding-top:10px;">
                                <div class="mw-timeline mw-timeline--justified">
                                    <div class="mw-timeline__items" v-for="(item, index) in list" :key="index">
                                        <div class="mw-timeline__item mw-timeline__item--left">
                                            <div class="mw-timeline__item-circle"></div>
                                            <div class="mw-timeline__item-time">
                                                2021-02-18 08:45
                                            </div>
                                            <div class="mw-timeline__item-content">
                                                <div class="mw-timeline__item-title">
                                                    提交审批
                                                </div>
                                                <div class="mw-timeline__item-body">
                                                    客户经理
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="tsx">
import { Dict } from '@/entry/third/dict'
import { FormColumn, FormRef, TableColumn, TableLoad, TableRef, FormRow } from '@/sharegood-ui'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { AnyType } from '@/@types'
type FormModel = AnyType<{
    name: string
}>
@Component({
    name: 'WorkbenchDoneDetail',
    components: {},
})
export default class WorkbenchDoneDetail extends Vue {
    list = [{}, {}, {}]
    mounted() {}
    @Ref('formRef')
    formRef!: FormRef
    /**表单值 */
    formModel = {} as FormModel
}
</script>

<style lang="less" scoped>
.WorkbenchDoneDetail ::v-deep {
    background-color: transparent !important;

    .detail {
        .el-card__body {
            height: 100%;
        }

        .body {
            height: 100%;
            .main {
                height: 100%;
            }
            .side {
                width: 350px;
                border-left: 1px solid #ddd;
                height: 100%;
                overflow-y: auto;
            }
        }
    }
}
</style>
