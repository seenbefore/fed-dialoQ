<template>
    <div class="exam-list">
        <!-- <van-button @click="handleBack">回退</van-button> -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="exam in examList" :key="exam.id" class="exam-item" @click="handleExamClick(exam)">
                <div class="exam-content">
                    <div class="exam-title">{{ exam.title }}</div>
                    <div class="exam-info">
                        <div class="info-item">
                            <span class="label">时间：</span>
                            <span class="value">{{ exam.startTime }}~{{ exam.endTime }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">时长：</span>
                            <span class="value">{{ exam.duration }}</span>
                        </div>
                    </div>
                </div>
                <div class="exam-status">
                    <van-button :type="getStatusBtnType(exam.status)" size="small" :disabled="exam.status === ExamStatus.FINISHED" :class="exam.status">
                        {{ getStatusText(exam.status) }}
                    </van-button>
                </div>
            </div>
        </van-list>

        <!-- 未开始考试弹窗 -->
        <van-dialog v-model="showNotStartDialog" :title="currentExam.title" :show-confirm-button="true" class="not-start-dialog">
            <div class="dialog-content">
                <div class="info-item">
                    <span class="label">时间：</span>
                    <span class="value">{{ currentExam.startTime }}~{{ currentExam.endTime }}</span>
                </div>
                <div class="info-item">
                    <span class="label">时长：</span>
                    <span class="value">{{ currentExam.duration }}</span>
                </div>
                <div class="countdown">
                    <van-icon name="clock-o" />
                    <span>还剩 {{ countdownTime }} 开始测评</span>
                </div>
            </div>
            <!-- <div class="dialog-footer">
                <van-button block @click="showNotStartDialog = false" class="dialog-btn">知道了</van-button>
            </div> -->
        </van-dialog>

        <!-- 考试结束弹窗 -->
        <van-dialog v-model="showExamEndDialog" :show-confirm-button="true" class="exam-end-dialog" close-on-click-overlay>
            <div class="exam-end-content">
                <div class="exam-end-icon">
                    <van-icon name="clock-o" size="40" />
                </div>
                <div class="exam-end-text">测评已结束</div>
            </div>
        </van-dialog>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { getExamList, ExamStatus } from './api'

@Component({
    name: 'ExamList',
    components: {},
})
export default class ExamList extends Vue {
    private examList: any[] = []
    private ExamStatus = ExamStatus
    private loading = false
    private finished = false
    private currentPage = 1
    private pageSize = 10
    private showNotStartDialog = false
    private currentExam: any = {}
    private countdownTime = '3:58'
    private showExamEndDialog = false

    mounted() {
        console.log('mounted')
    }
    handleBack() {
        this.$back(true)
    }

    private async onLoad() {
        const res = await getExamList({
            page: this.currentPage,
            pageSize: this.pageSize,
        })

        if (this.currentPage === 1) {
            this.examList = res.data
        } else {
            this.examList.push(...res.data)
        }

        if (res.data.length < this.pageSize) {
            this.finished = true
        } else {
            this.currentPage += 1
        }

        this.loading = false
    }

    private getStatusText(status: ExamStatus) {
        const statusMap = {
            [ExamStatus.NOT_START]: '未开始',
            [ExamStatus.IN_PROGRESS]: '考试中',
            [ExamStatus.FINISHED]: '已结束',
        }
        return statusMap[status]
    }

    private getStatusBtnType(status: ExamStatus) {
        const typeMap = {
            [ExamStatus.NOT_START]: 'warning',
            [ExamStatus.IN_PROGRESS]: 'danger',
            [ExamStatus.FINISHED]: 'default',
        }
        return typeMap[status]
    }

    private handleExamClick(exam: any) {
        if (exam.status === ExamStatus.FINISHED) {
            this.showExamEndDialog = true
            return
        }

        if (exam.status === ExamStatus.NOT_START) {
            this.currentExam = exam
            this.showNotStartDialog = true
            return
        }

        // 跳转到考试页面
        this.$router.push({
            path: `/exam/detail/${exam.id}`,
            query: {
                examId: exam.id,
            },
        })
    }
}
</script>

<style lang="less" scoped>
.exam-list::v-deep {
    min-height: 100vh;
    background: #f5f5f5;
    padding: 12px;
    padding-left: 0;
    padding-right: 0;

    .van-list {
        .exam-item {
            background: #fff;
            // border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;

            .exam-content {
                flex: 1;
                margin-right: 16px;

                .exam-title {
                    font-size: 16px;
                    font-weight: 500;
                    color: #333;
                    margin-bottom: 12px;
                    line-height: 1.4;
                }

                .exam-info {
                    font-size: 14px;
                    color: #666;

                    .info-item {
                        margin-bottom: 4px;
                        line-height: 1.4;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        .label {
                            color: #999;
                        }

                        .value {
                            color: #666;
                        }
                    }
                }
            }

            .exam-status {
                flex-shrink: 0;

                .van-button {
                    min-width: 64px;
                    border-radius: 4px;
                    height: 24px;
                    padding: 0;

                    &--warning {
                        background: #ebb257;
                        border-color: #ebb257;
                    }

                    &--danger {
                        background: #ee0a24;
                        border-color: #ee0a24;
                    }

                    &--default {
                        background: #666666;
                        border-color: #666666;
                        color: #fff;
                    }
                }
            }
        }
    }

    .van-list__finished-text {
        color: #999;
        font-size: 14px;
        padding: 16px 0;
        text-align: center;
    }

    .van-list__loading {
        padding: 16px 0;
    }

    .exam-status {
        .not_start {
            background: #ebb257;
        }
    }

    // 添加弹窗样式
    .not-start-dialog {
        .van-dialog__header {
            padding: 20px 16px 16px;
            font-size: 16px;
            font-weight: 500;
            text-align: left;
        }

        .dialog-content {
            padding: 0 16px 20px;

            .info-item {
                margin-bottom: 8px;
                font-size: 14px;
                line-height: 1.4;

                .label {
                    color: #999;
                }

                .value {
                    color: #333;
                }
            }

            .countdown {
                margin-top: 16px;
                padding: 12px;
                background: #fff7e6;
                border-radius: 4px;
                border: 1px solid #ff7d00;
                color: #ff7d00;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;

                .van-icon {
                    margin-right: 4px;
                    font-size: 16px;
                }
            }
        }
    }

    // 添加考试结束弹窗样式
    .exam-end-dialog {
        .van-dialog__content {
            padding: 20px;
        }

        .exam-end-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;

            .exam-end-icon {
                margin-bottom: 16px;
                .van-icon {
                    color: #666;
                }
            }

            .exam-end-text {
                font-size: 16px;
                color: #333;
                margin-bottom: 24px;
            }

            .know-btn {
                width: 100%;
                height: 44px;
                font-size: 16px;
                color: #1989fa;
                border-color: #ebedf0;
            }
        }
    }
    .van-dialog__confirm {
        color: #1989fa;
    }
}
</style>
