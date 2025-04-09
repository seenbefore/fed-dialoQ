<template>
    <div class="questionnaire-preview-component" v-loading="loading">
        <div v-if="questionnaire.title || formData.title" class="questionnaire-content">
            <div class="questionnaire-header">
                <h2 class="questionnaire-title">{{ questionnaire.title || formData.title }}</h2>
                <div class="questionnaire-desc">{{ questionnaire.description || formData.description }}</div>
                <div class="questionnaire-info">
                    <span v-if="questionnaire.responseCount">答卷数量：{{ questionnaire.responseCount }}</span>
                    <span v-if="questionnaire.endTime || formData.endTime">截止时间：{{ questionnaire.endTime || formData.endTime }}</span>
                    <span>{{ questionnaire.isAnonymous || formData.isAnonymous ? '匿名填写' : '实名填写' }}</span>
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

                <div v-if="questions.length === 0" class="empty-questions">
                    <el-empty description="暂无问题，请在编辑区添加问题"></el-empty>
                </div>
            </div>

            <div class="questionnaire-footer">
                <el-button type="primary" @click="submitQuestionnaire">提交问卷</el-button>
            </div>
        </div>
        <div v-else class="questionnaire-empty">
            <el-empty description="请先填写问卷基本信息"></el-empty>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { QuestionnaireVO } from '../api'
import { Question } from './QuestionnaireEditor.vue'

@Component({
    name: 'QuestionnairePreview',
})
export default class QuestionnairePreview extends Vue {
    @Prop({ type: Object, default: () => ({}) }) readonly questionnaire!: Partial<QuestionnaireVO>
    @Prop({ type: Object, default: () => ({}) }) readonly formData!: Partial<QuestionnaireVO>
    @Prop({ type: Array, default: () => [] }) readonly questions!: Question[]
    @Prop({ type: Boolean, default: false }) readonly loading!: boolean

    private answers: Record<string, any> = {}

    @Watch('questions', { deep: true, immediate: true })
    onQuestionsChange() {
        this.initAnswers()
    }

    created() {
        this.initAnswers()
    }

    initAnswers() {
        const answers: Record<string, any> = {}
        this.questions.forEach(question => {
            if (question.type === 'multipleChoice') {
                answers[question.id] = []
            } else {
                answers[question.id] = ''
            }
        })
        this.answers = answers
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
        this.initAnswers() // 重置答案
    }
}
</script>

<style scoped lang="less">
.questionnaire-preview-component {
    height: 100%;
    overflow-y: auto;

    .questionnaire-content {
        background-color: #fff;
        border-radius: 4px;
        padding: 20px;
        height: 100%;
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
            flex-wrap: wrap;
            gap: 20px;
        }
    }

    .questionnaire-body {
        min-height: 200px;
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

    .questionnaire-empty,
    .empty-questions {
        text-align: center;
        padding: 50px 0;
    }
}
</style>
