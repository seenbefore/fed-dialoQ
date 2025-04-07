<template>
    <admin-page class="ResponseDetail" :back-url="`/survey/analysis/responses?id=${questionnaireId}&title=${questionnaireTitle}`">
        <template #title>
            <span>{{ questionnaireTitle }} - 答卷详情</span>
        </template>

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

        <template #footer="{ back }">
            <el-button @click="back">返回</el-button>
        </template>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { responseDetail, detail, ResponseVO, QuestionnaireVO } from '../api'

/*
 * 描述: 问卷答卷详情查看
 *
 * 功能描述:
 * - 查看答卷提交详情
 * - 查看答案内容
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

    async fetchResponseDetail() {
        try {
            const { data } = await responseDetail({ id: this.id })
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
}
</style>
