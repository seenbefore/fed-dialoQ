<!-- 我的待办-审批 -->
<template>
    <div class="sg-page WorkbenchTodoDetail">
        <div class="ic-row column ic-h-100">
            <el-card class="my-card">
                <div slot="header" class="ic-row middle">
                    <div class="ic-col-flex-1 ic-row middle">
                        <span class="ic-font-20 ic-bold ic-mr-4">审批</span>
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
                <SidePanel></SidePanel>
                <div class="ic-row column" style="height:100%;">
                    <div class="ic-row body ic-col-flex-1">
                        <div class="main  ic-col-flex-1">
                            <!-- 报告内容 -->
                            <ReportBox></ReportBox>
                        </div>
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
                                        <el-button type="text" size="mini" @click="openFlowDialog">查看流程图</el-button>
                                    </div>
                                </div>
                                <!--审批日志 -->
                                <AuditLog :instance-id="exRow.instanceId"></AuditLog>
                            </div>
                        </div>
                    </div>
                    <div class="footer ic-row middle center">
                        <div class="btn btn-success" @click="open('pass')">审批通过</div>
                        <div type="primary" class=" btn btn-primary" @click="open('back')">退回</div>
                        <div type="primary" class=" btn btn-danger" @click="open('reject')">否决</div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="tsx">
import PageTab from '@/entry/third/components/page-tab/index.vue'
import SidePanel from '@/entry/third/components/side-panel/index.vue'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import AuditLog from './components/audit-log/index.vue'
import ReportBox from './components/report-box/index.vue'

@Component({
    name: 'WorkbenchTodoDetail',
    components: {
        PageTab,
        SidePanel,
        AuditLog,
        ReportBox,
    },
})
export default class WorkbenchTodoDetail extends Vue {
    @Prop() row!: any
    get exRow() {
        if (this.row) {
            return JSON.parse(this.row)
        }
        return {}
    }

    async mounted() {}
    async openFlowDialog() {
        await this.$modalDialog(() => import('./components/flow-dialog/index.vue'), {})
    }
    async open(action: string) {
        await this.$modalDialog(() => import('./components/audit-dialog/index.vue'), {
            action,
        })
    }
}
</script>

<style lang="less" scoped>
.WorkbenchTodoDetail ::v-deep {
    background-color: transparent !important;

    .my-card .el-card__header::after {
        display: none !important;
    }
    .detail {
        .el-card__body {
            height: 100%;
            padding: 0 !important;
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
        .footer {
            // height: 102px;
            height: 82px;
            border-top: 1px solid #ddd;
            margin: 0;
            // flex-shrink: 0;

            > .btn {
                cursor: pointer;
                display: flex;
                width: 130px;
                height: 46px;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                border-radius: 4px;
                color: #fff;
                background: #11cf98;
                border: 1px solid #11cf98;

                + .btn {
                    margin-left: 20px;
                }
                &.btn-primary {
                    border-color: #0797f3;
                    color: #0797f3;
                    background: transparent;
                }
                &.btn-danger {
                    border-color: #f74d54;
                    color: #f74d54;
                    background: transparent;
                }
            }
        }

        .report-body {
            overflow-y: auto;
        }
    }
}
</style>
