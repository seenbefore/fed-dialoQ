<template>
    <div class="questionnaire-fill-page">
        <div class="questionnaire-container" v-loading="loading">
            <div v-if="questionnaire.id" class="questionnaire-content">
                <div class="questionnaire-header">
                    <h2 class="questionnaire-title">{{ questionnaire.title }}</h2>
                    <div class="questionnaire-desc">{{ questionnaire.description }}</div>
                    <div class="questionnaire-info">
                        <span v-if="questionnaire.endTime">截止时间：{{ questionnaire.endTime }}</span>
                        <span>{{ questionnaire.isAnonymous ? '匿名填写' : '请如实填写' }}</span>
                    </div>
                </div>

                <div class="questionnaire-body">
                    <!-- 用户信息部分，非匿名问卷才显示 -->
                    <div v-if="!questionnaire.isAnonymous" class="user-info-section">
                        <div class="question-title">
                            <span>基本信息</span>
                            <span class="required">*</span>
                        </div>
                        <div class="user-info-form">
                            <el-form :model="userInfo" label-width="80px">
                                <el-form-item label="姓名" required>
                                    <el-input v-model="userInfo.name" placeholder="请输入您的姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式">
                                    <el-input v-model="userInfo.contact" placeholder="请输入您的联系方式"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>

                    <!-- 问卷问题部分 -->
                    <div v-for="(question, index) in questions" :key="index" class="question-item">
                        <div class="question-title">
                            <span class="question-index">{{ index + 1 }}</span>
                            <span>{{ question.title }}</span>
                            <span v-if="question.required" class="required">*</span>
                        </div>
                        <div class="question-content">
                            <template v-if="question.type === 'singleChoice'">
                                <el-radio-group :value="answers[question.id]" @input="val => updateAnswer(question.id, val)">
                                    <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
                                        <el-radio :label="option.id">{{ option.text }}</el-radio>
                                    </div>
                                </el-radio-group>
                            </template>
                            <template v-else-if="question.type === 'multipleChoice'">
                                <el-checkbox-group :value="answers[question.id]" @input="val => updateAnswer(question.id, val)">
                                    <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
                                        <el-checkbox :label="option.id">{{ option.text }}</el-checkbox>
                                    </div>
                                </el-checkbox-group>
                            </template>
                            <template v-else>
                                <el-input type="textarea" :rows="3" :value="answers[question.id]" @input="val => updateAnswer(question.id, val)" placeholder="请输入"></el-input>
                            </template>
                        </div>
                    </div>
                </div>

                <div class="questionnaire-footer">
                    <el-button type="primary" @click="submitQuestionnaire">提交问卷</el-button>
                </div>
            </div>
            <div v-else-if="!loading" class="questionnaire-empty">
                <el-empty description="问卷不存在或已截止"></el-empty>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { detail, QuestionnaireVO } from '../api'
import { submitResponse } from '../api'

interface Question {
    id: string
    type: 'singleChoice' | 'multipleChoice' | 'text'
    title: string
    options: Array<{ id: string; text: string }>
    required: boolean
}

@Component({
    name: 'QuestionnaireFill',
})
export default class QuestionnaireFill extends Vue {
    private loading = false
    private submitting = false
    private questionnaire: Partial<QuestionnaireVO> = {}
    private questions: Question[] = []
    private answers: Record<string, any> = {}
    private startTime: number = Date.now()
    private userInfo = {
        name: '',
        contact: '',
    }

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

            // 检查问卷是否已发布
            if (data.status !== '1') {
                this.$message.error('问卷未发布或已下线')
                this.questionnaire = {}
                return
            }

            // 检查问卷是否已截止
            if (data.endTime && new Date(data.endTime) < new Date()) {
                this.$message.error('问卷已截止')
                this.questionnaire = {}
                return
            }

            this.questionnaire = data

            // 解析问卷内容
            if (data.content) {
                try {
                    const content = JSON.parse(data.content)
                    this.questions = content.questions || []

                    // 初始化答案 - 使用$set方法确保响应式
                    this.answers = {}
                    this.questions.forEach(question => {
                        const initialValue = question.type === 'multipleChoice' ? [] : ''
                        this.$set(this.answers, question.id, initialValue)
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

    // 添加新方法处理答案更新
    updateAnswer(questionId: string, value: any) {
        this.$set(this.answers, questionId, value)
    }

    async submitQuestionnaire() {
        if (this.submitting) return

        // 验证非匿名问卷的用户信息
        if (!this.questionnaire.isAnonymous && !this.userInfo.name) {
            return this.$message.warning('请填写您的姓名')
        }

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

        try {
            this.submitting = true

            // 计算答题时长（秒）
            const duration = Math.floor((Date.now() - this.startTime) / 1000)

            // 构建答卷数据
            const responseData = {
                questionnaireId: this.questionnaire.id,
                submitter: this.questionnaire.isAnonymous ? '匿名用户' : this.userInfo.name,
                content: JSON.stringify({
                    userInfo: this.questionnaire.isAnonymous ? null : this.userInfo,
                    answers: this.answers,
                }),
                duration,
            }

            // 提交答卷
            await submitResponse(responseData)

            this.$message.success('问卷提交成功，感谢您的参与！')

            // 显示提交成功页面
            this.showSuccessPage()
        } catch (error) {
            console.error('提交问卷失败', error)
            this.$message.error('提交失败，请重试')
        } finally {
            this.submitting = false
        }
    }

    showSuccessPage() {
        // 清空表单数据，显示成功页面
        this.answers = {}
        this.userInfo = { name: '', contact: '' }
        this.questionnaire = {
            ...this.questionnaire,
            title: '提交成功',
            description: '感谢您的参与，您的反馈对我们非常重要！',
        }
        this.questions = []
    }
}
</script>

<style scoped lang="less">
.questionnaire-fill-page {
    min-height: 100vh;
    background-color: #f5f7fa;
    padding: 20px;

    .questionnaire-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .questionnaire-content {
        background-color: #fff;
        border-radius: 4px;
        padding: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .questionnaire-header {
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;

        .questionnaire-title {
            font-size: 24px;
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

    .user-info-section {
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px dashed #eee;
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
            background-color: #409eff;
            color: #fff;
            margin-right: 10px;
        }

        .required {
            color: #f56c6c;
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
        background-color: #fff;
        padding: 50px 0;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
}
</style>
