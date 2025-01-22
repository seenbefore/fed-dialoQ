<template>
    <el-dialog class="AnswerDetailDialog" :title="title" :visible="true" width="1000px" @close="cancel">
        <div class="drawer-container" v-loading="loading">
            <!-- 基本信息 -->
            <!-- <div class="detail-section">
                <div class="detail-title">考生信息</div>
                <sg-base-form ref="formRef" v-model="formModel" v-bind="getFormAttrs"></sg-base-form>
            </div> -->

            <!-- 答题详情 -->
            <div class="detail-section">
                <div class="detail-title">答题详情</div>
                <div class="question-list">
                    <div v-for="(question, index) in formModel.answerDetails" :key="index" class="question-item">
                        <div class="question-header">
                            <span class="question-index">第{{ index + 1 }}题</span>
                            <el-tag :type="question.isCorrect === '1' ? 'success' : 'danger'" size="small">
                                {{ question.isCorrect === '1' ? '正确' : '错误' }}
                            </el-tag>
                            <span class="question-score">得分：{{ question.questionScore }}</span>
                        </div>
                        <div class="question-content">{{ question.questionContent }}</div>
                        <div class="options-list">
                            <template v-if="question.questionOptions">
                                <div v-for="option in JSON.parse(question.questionOptions)" :key="option.code" class="option-item">
                                    <span
                                        :class="{
                                            'option-correct': option.code === question.correctAnswer,
                                            'option-wrong': option.code === question.userAnswer && option.code !== question.correctAnswer,
                                        }"
                                    >
                                        {{ option.code }}. {{ option.content }}
                                    </span>
                                </div>
                            </template>
                        </div>
                        <div class="answer-info">
                            <div>
                                正确答案：
                                <span class="text-success">{{ question.correctAnswer }}</span>
                            </div>
                            <div>
                                考生答案：
                                <span :class="question.isCorrect === '1' ? 'text-success' : 'text-danger'">{{ question.userAnswer }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <el-button @click="cancel">关闭</el-button>
        </template>
    </el-dialog>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormColumn } from '@/sharegood-ui'
import { getExamRecordDetail, ExamRecordDetailVO } from '../../../api'
import moment from 'moment'

@Component({
    name: 'AnswerDetailDialog',
})
export default class AnswerDetailDialog extends Vue {
    /** 考试记录ID */
    @Prop({ required: true }) paperId!: string
    /** 用户ID */
    @Prop({ required: true }) userId!: string
    /** 考生数据 */
    @Prop({ default: () => ({}) }) data!: any

    loading = false
    formModel: Partial<ExamRecordDetailVO> = {
        ...this.data,
    }

    async mounted() {
        await this.fetchDetail()
    }

    async fetchDetail() {
        this.loading = true
        try {
            const { data } = await getExamRecordDetail({
                paperId: this.paperId,
                userId: this.userId,
            })
            this.formModel = data
        } finally {
            this.loading = false
        }
    }

    get title() {
        return '答卷详情'
    }

    get getFormAttrs() {
        const fields: FormColumn[] = [
            {
                tag: 'text',
                name: 'userName',
                itemAttrs: {
                    label: '考生姓名',
                },
            },
            {
                tag: 'text',
                name: 'studentNo',
                itemAttrs: {
                    label: '学号',
                },
            },
            {
                tag: 'text',
                name: 'mobile',
                itemAttrs: {
                    label: '手机号',
                },
                render: (h, { row }) => {
                    // 隐藏手机号中间四位
                    const mobile = row.mobile?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                    return <span>{mobile}</span>
                },
            },
            {
                tag: 'text',
                name: 'score',
                itemAttrs: {
                    label: '得分',
                },
                render: (h, { row }) => {
                    return <span class={row.isPass === '1' ? 'text-success' : 'text-danger'}>{row.score}</span>
                },
            },
            {
                tag: 'text',
                name: 'isPass',
                itemAttrs: {
                    label: '是否通过',
                },
                render: (h, { row }) => {
                    return <el-tag type={row.isPass === '1' ? 'success' : 'danger'}>{row.isPass === '1' ? '通过' : '未通过'}</el-tag>
                },
            },
            {
                tag: 'text',
                name: 'actualStartTime',
                itemAttrs: {
                    label: '开始时间',
                },
                render: (h, { row }) => {
                    return <span>{moment(row.actualStartTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                },
            },
            {
                tag: 'text',
                name: 'actualEndTime',
                itemAttrs: {
                    label: '结束时间',
                },
                render: (h, { row }) => {
                    return <span>{moment(row.actualEndTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                },
            },
            {
                tag: 'text',
                name: 'duration',
                itemAttrs: {
                    label: '答题时长',
                },
                render: (h, { row }) => {
                    return <span>{row.duration}分钟</span>
                },
            },
        ]
        return {
            span: 12,
            fields,
        }
    }

    cancel() {
        this.$options.cancel?.()
    }
}
</script>

<style lang="less" scoped>
.AnswerDetailDialog {
    ::v-deep {
        .el-dialog__body {
            padding: 20px;
            max-height: 70vh;
            overflow-y: auto;
        }

        .detail-section {
            margin-bottom: 20px;

            .detail-title {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 15px;
                padding-left: 10px;
                border-left: 4px solid var(--color-primary);
            }
        }

        .question-list {
            .question-item {
                margin-bottom: 20px;
                padding: 15px;
                border: 1px solid #ebeef5;
                border-radius: 4px;

                .question-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;

                    .question-index {
                        margin-right: 10px;
                        font-weight: bold;
                    }

                    .question-score {
                        margin-left: 10px;
                        color: #666;
                    }
                }

                .question-content {
                    margin-bottom: 10px;
                    line-height: 1.5;
                }

                .options-list {
                    margin-bottom: 10px;

                    .option-item {
                        margin-bottom: 8px;
                        line-height: 1.5;

                        .option-correct {
                            color: var(--color-success);
                        }

                        .option-wrong {
                            color: var(--color-danger);
                        }
                    }
                }

                .answer-info {
                    display: flex;
                    gap: 20px;
                    color: #666;
                }
            }
        }
    }
}
</style>
