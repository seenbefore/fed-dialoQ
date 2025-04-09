<template>
    <admin-page class="ResponseDetail" :back-url="`/survey/analysis/responses?id=${questionnaireId}&title=${questionnaireTitle}`">
        <template #title>
            <span>{{ questionnaireTitle }} - 答卷详情</span>
        </template>

        <el-row :gutter="20">
            <!-- 左侧答卷详情 -->
            <el-col :span="16">
                <el-card>
                    <div slot="header">
                        <span>答卷信息</span>
                    </div>

                    <el-descriptions :column="2">
                        <el-descriptions-item label="提交人">{{ responseData.submitter || '匿名用户' }}</el-descriptions-item>
                        <el-descriptions-item label="提交时间">{{ responseData.submitTime }}</el-descriptions-item>
                        <el-descriptions-item label="答题耗时">{{ formatDuration(responseData.duration) }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>

                <div v-if="questions.length > 0" class="question-answers">
                    <el-card v-for="(question, index) in questions" :key="index" class="question-card">
                        <div class="question-title">
                            <span class="question-number">{{ index + 1 }}</span>
                            <span class="question-text">{{ question.title }}</span>
                            <span v-if="question.required" class="required">*</span>
                        </div>

                        <div class="question-answer">
                            <!-- 单选题 -->
                            <template v-if="question.type === 'singleChoice'">
                                <div v-for="option in question.options" :key="option.id" class="option">
                                    <el-radio v-model="question.answer" :label="option.id" disabled>
                                        {{ option.text }}
                                    </el-radio>
                                </div>
                            </template>

                            <!-- 多选题 -->
                            <template v-else-if="question.type === 'multipleChoice'">
                                <div v-for="option in question.options" :key="option.id" class="option">
                                    <el-checkbox v-model="question.selectedOptions" :label="option.id" disabled>
                                        {{ option.text }}
                                    </el-checkbox>
                                </div>
                            </template>

                            <!-- 文本题 -->
                            <template v-else-if="question.type === 'text'">
                                <el-input v-model="question.answer" type="textarea" :rows="4" disabled></el-input>
                            </template>
                        </div>
                    </el-card>
                </div>
            </el-col>

            <!-- 右侧AI总结 -->
            <el-col :span="8">
                <el-card class="ai-summary-card">
                    <div slot="header">
                        <span>AI 分析总结</span>
                    </div>
                    <div v-if="responseData.aiSummary" class="ai-summary-content markdown-body" v-html="formatAiSummary"></div>
                    <div v-else class="ai-summary-empty">
                        <i class="el-icon-data-analysis"></i>
                        <p>暂无AI分析总结</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <template #footer="{ back }">
            <el-button @click="back">返回</el-button>
        </template>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { responseDetail, detail, ResponseVO, QuestionnaireVO } from '../api'
import { marked } from 'marked'

/*
 * 描述: 问卷答卷详情查看
 *
 * 功能描述:
 * - 查看答卷提交详情
 * - 查看答案内容
 * - 查看AI分析总结
 */
@Component({
    name: 'ResponseDetail',
})
export default class ResponseDetail extends Vue {
    @Prop({ default: '' }) id!: string
    @Prop({ default: '' }) title!: string

    questionnaireId = ''
    questionnaireTitle = this.title || '问卷'

    responseData: ResponseVO = {
        id: '',
        questionnaireId: '',
        questionnaireTitle: '',
        content: '',
        submitTime: '',
        submitter: '',
        submitterId: '',
        duration: 0,
        aiSummary: '',
    }

    questionnaireData: QuestionnaireVO = {
        id: '',
        title: '',
        responseCount: 0,
        status: '',
        createTime: '',
        updateTime: '',
    }

    questions: any[] = []

    async mounted() {
        await this.fetchResponseDetail()
    }

    get formatAiSummary() {
        try {
            // 使用marked将markdown格式转换为HTML
            return marked(this.responseData.aiSummary || '')
        } catch (error) {
            console.error('解析AI总结内容失败', error)
            return this.responseData.aiSummary || ''
        }
    }

    async fetchResponseDetail() {
        try {
            const { data } = await responseDetail(this.id)
            this.responseData = data
            this.questionnaireId = data.questionnaireId

            // 获取问卷内容
            const { data: questionnaireData } = await detail({ id: data.questionnaireId })
            this.questionnaireData = questionnaireData

            // 解析问卷内容和答卷内容
            this.parseQuestionnaire()
        } catch (error) {
            console.error('获取答卷详情失败', error)
            this.$message.error('获取答卷详情失败')
        }
    }

    parseQuestionnaire() {
        try {
            // 解析问卷内容
            const questionnaireContent = JSON.parse(this.questionnaireData.content || '{}')
            const questions = questionnaireContent.questions || []

            // 解析答卷内容
            const responseContent = JSON.parse(this.responseData.content || '{}')
            const answers = responseContent.answers || []

            // 合并问题和答案
            this.questions = questions.map((question: any) => {
                const answer = answers.find((a: any) => a.questionId === question.id)

                if (question.type === 'multipleChoice' && answer) {
                    return {
                        ...question,
                        selectedOptions: Array.isArray(answer.answer) ? answer.answer : [],
                    }
                }

                return {
                    ...question,
                    answer: answer ? answer.answer : '',
                }
            })
        } catch (error) {
            console.error('解析问卷内容失败', error)
        }
    }

    formatDuration(duration?: number) {
        if (!duration) return '0秒'

        if (duration < 60) {
            return `${duration}秒`
        } else if (duration < 3600) {
            return `${Math.floor(duration / 60)}分${duration % 60}秒`
        } else {
            const hours = Math.floor(duration / 3600)
            const minutes = Math.floor((duration % 3600) / 60)
            const seconds = duration % 60
            return `${hours}时${minutes}分${seconds}秒`
        }
    }
}
</script>

<style scoped lang="less">
.ResponseDetail ::v-deep {
    .question-answers {
        margin-top: 20px;

        .question-card {
            margin-bottom: 20px;

            .question-title {
                margin-bottom: 16px;

                .question-number {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    background-color: var(--color-primary);
                    color: #fff;
                    border-radius: 50%;
                    margin-right: 8px;
                }

                .question-text {
                    font-weight: bold;
                }

                .required {
                    color: var(--color-danger);
                    margin-left: 4px;
                }
            }

            .question-answer {
                padding-left: 32px;

                .option {
                    margin-bottom: 12px;
                }
            }
        }
    }

    .ai-summary-card {
        height: 100%;

        .ai-summary-content {
            max-height: 800px;
            overflow-y: auto;
            line-height: 1.6;

            h1,
            h2,
            h3 {
                margin-top: 16px;
                margin-bottom: 8px;
                font-weight: 600;
            }

            h1 {
                font-size: 20px;
                border-bottom: 1px solid #eaecef;
                padding-bottom: 8px;
            }

            h2 {
                font-size: 18px;
            }

            h3 {
                font-size: 16px;
            }

            p {
                margin: 8px 0;
            }

            ul,
            ol {
                padding-left: 20px;
                margin: 8px 0;
            }
        }

        .ai-summary-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 200px;
            color: #909399;

            i {
                font-size: 48px;
                margin-bottom: 16px;
            }

            p {
                font-size: 16px;
            }
        }
    }
}
</style>
