<template>
    <admin-page class="QuestionnairePreview" back-url="/survey/questionnaire">
        <template #title>
            <span>问卷预览填写</span>
        </template>

        <div class="questionnaire-container" v-loading="loading">
            <div v-if="questionnaire.id" class="questionnaire-content">
                <div class="questionnaire-header">
                    <h2 class="questionnaire-title">{{ questionnaire.title }}</h2>
                    <div class="questionnaire-desc">{{ questionnaire.description }}</div>
                    <div class="questionnaire-info">
                        <span>答卷数量：{{ questionnaire.responseCount }}</span>
                        <span v-if="questionnaire.endTime">截止时间：{{ questionnaire.endTime }}</span>
                        <span>{{ questionnaire.isAnonymous ? '匿名填写' : '实名填写' }}</span>
                    </div>
                </div>

                <div class="questionnaire-body">
                    <div v-for="(question, index) in questions" :key="index" class="question-item">
                        <div class="question-title">
                            <span class="question-index">{{ index + 1 }}</span>
                            <span>{{ question.title }}</span>
                            <span v-if="question.required" class="required">*</span>
                        </div>
                        <div class="question-content">
                            <template v-if="question.type === 'singleChoice'">
                                <el-radio-group v-model="answers[question.id]">
                                    <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
                                        <el-radio :label="option.id">{{ option.text }}</el-radio>
                                    </div>
                                </el-radio-group>
                            </template>
                            <template v-else-if="question.type === 'multipleChoice'">
                                <el-checkbox-group v-model="answers[question.id]">
                                    <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
                                        <el-checkbox :label="option.id">{{ option.text }}</el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </template>
                            <template v-else>
                                <el-input type="textarea" :rows="3" v-model="answers[question.id]" placeholder="请输入"></el-input>
                            </template>
                        </div>
                    </div>
                </div>

                <div class="questionnaire-footer">
                    <el-button type="primary" @click="submitQuestionnaire">提交问卷</el-button>
                    <el-button @click="goBack">返回</el-button>
                </div>
            </div>
            <div v-else-if="!loading" class="questionnaire-empty">
                <el-empty description="问卷不存在或已删除"></el-empty>
                <el-button @click="goBack">返回列表</el-button>
            </div>
        </div>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { detail, QuestionnaireVO } from '../api'

interface Question {
    id: string
    type: 'singleChoice' | 'multipleChoice' | 'text'
    title: string
    options: Array<{ id: string; text: string }>
    required: boolean
}

@Component({
    name: 'QuestionnairePreview',
})
export default class QuestionnairePreview extends Vue {
    private loading = false
    private questionnaire: Partial<QuestionnaireVO> = {}
    private questions: Question[] = []
    private answers: Record<string, any> = {}

    created() {
        this.loadQuestionnaire()
    }

    async loadQuestionnaire() {
        const id = this.$route.query.id as string
        if (!id) {
            return
        }

        try {
            this.loading = true
            const { data } = await detail({ id })
            this.questionnaire = data

            // 解析问卷内容
            if (data.content) {
                try {
                    const content = JSON.parse(data.content)
                    this.questions = content.questions || []

                    // 初始化答案
                    this.questions.forEach(question => {
                        if (question.type === 'multipleChoice') {
                            this.answers[question.id] = []
                        } else {
                            this.answers[question.id] = ''
                        }
                    })
                } catch (e) {
                    console.error('解析问卷内容失败', e)
                    this.questions = []
                }
            }
        } catch (error) {
            console.error('获取问卷详情失败', error)
            this.$message.error('获取问卷详情失败')
        } finally {
            this.loading = false
        }
    }

    submitQuestionnaire() {
        // 检查必填题是否已填写
        const unfilledQuestions = this.questions.filter(q => {
            if (!q.required) return false

            const answer = this.answers[q.id]
            if (Array.isArray(answer)) {
                return answer.length === 0
            } else {
                return !answer
            }
        })

        if (unfilledQuestions.length > 0) {
            const firstQuestion = unfilledQuestions[0]
            return this.$message.warning(`请填写第${this.questions.findIndex(q => q.id === firstQuestion.id) + 1}题 "${firstQuestion.title}"`)
        }

        // 模拟提交
        this.$message.success('问卷提交成功')
        setTimeout(() => {
            this.goBack()
        }, 1000)
    }

    goBack() {
        if (window.opener) {
            window.close()
        } else {
            this.$router.push('/survey/questionnaire')
        }
    }
}
</script>

<style scoped lang="less">
.QuestionnairePreview {
    .questionnaire-container {
        padding: 0 20px;
    }

    .questionnaire-content {
        max-width: 800px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 4px;
        padding: 20px;
    }

    .questionnaire-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;

        .questionnaire-title {
            font-size: 22px;
            margin-bottom: 15px;
            font-weight: bold;
        }

        .questionnaire-desc {
            color: #666;
            line-height: 1.6;
            margin-bottom: 15px;
        }

        .questionnaire-info {
            color: #999;
            font-size: 14px;
            display: flex;
            justify-content: center;
            gap: 20px;
        }
    }

    .question-item {
        margin-bottom: 30px;

        .question-title {
            font-weight: bold;
            margin-bottom: 15px;
            font-size: 16px;
        }

        .question-index {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 50%;
            background-color: var(--color-primary);
            color: #fff;
            margin-right: 10px;
        }

        .required {
            color: var(--color-danger);
            margin-left: 5px;
        }

        .question-content {
            padding-left: 34px;

            .option-item {
                margin-bottom: 10px;
            }
        }
    }

    .questionnaire-footer {
        text-align: center;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #eee;
    }

    .questionnaire-empty {
        text-align: center;
        padding: 50px 0;
    }
}
</style>
