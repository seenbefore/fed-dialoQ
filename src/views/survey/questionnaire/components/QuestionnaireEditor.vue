<template>
    <div class="questionnaire-editor" v-loading="loading">
        <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
            <el-card class="mb-20">
                <div slot="header">基本信息</div>
                <el-form-item label="问卷标题" prop="title">
                    <el-input v-model="formData.title" placeholder="请输入问卷标题" @input="onFormDataChange"></el-input>
                </el-form-item>
                <el-form-item label="问卷描述" prop="description">
                    <el-input v-model="formData.description" type="textarea" :rows="3" placeholder="请输入问卷描述" @input="onFormDataChange"></el-input>
                </el-form-item>
                <el-form-item label="截止时间" prop="endTime">
                    <el-date-picker v-model="formData.endTime" type="datetime" placeholder="选择截止时间" value-format="yyyy-MM-dd HH:mm:ss" @change="onFormDataChange"></el-date-picker>
                </el-form-item>
                <el-form-item label="匿名填写" prop="isAnonymous">
                    <el-switch v-model="formData.isAnonymous" @change="onFormDataChange"></el-switch>
                </el-form-item>
            </el-card>

            <el-card>
                <div slot="header">问卷内容</div>
                <div>
                    <div v-for="(question, index) in questions" :key="index" class="question-item">
                        <div class="question-header">
                            <span class="question-index">{{ index + 1 }}</span>
                            <el-select v-model="question.type" placeholder="请选择题型" style="width: 150px; margin-right: 15px" @change="() => onQuestionChange()">
                                <el-option label="单选题" value="singleChoice"></el-option>
                                <el-option label="多选题" value="multipleChoice"></el-option>
                                <el-option label="填空题" value="text"></el-option>
                            </el-select>
                            <el-input v-model="question.title" placeholder="请输入题目" style="width: 400px; margin-right: 15px" @input="onQuestionChange"></el-input>
                            <el-checkbox v-model="question.required" @change="onQuestionChange">必填</el-checkbox>
                            <el-button type="text" class="text-danger" @click="removeQuestion(index)">删除</el-button>
                        </div>

                        <div class="question-options" v-if="question.type !== 'text'">
                            <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
                                <el-input v-model="option.text" placeholder="请输入选项内容" style="width: 400px; margin-right: 15px" @input="onQuestionChange"></el-input>
                                <el-button type="text" class="text-danger" @click="removeOption(question, optIndex)">
                                    删除
                                </el-button>
                            </div>
                            <el-button type="text" icon="el-icon-plus" @click="addOption(question)">
                                添加选项
                            </el-button>
                        </div>
                    </div>

                    <div class="add-question">
                        <el-button type="primary" plain icon="el-icon-plus" @click="addQuestion">
                            添加题目
                        </el-button>
                    </div>
                </div>
            </el-card>

            <div class="action-btns">
                <el-button type="primary" @click="saveQuestionnaire('PUBLISHED')">发布</el-button>
                <el-button @click="saveQuestionnaire('DRAFT')">保存草稿</el-button>
                <el-button @click="cancel">取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import { save, QuestionnaireVO } from '../api'
import { QuestionnaireStatusEnum } from '../enum'

export interface Question {
    id: string
    type: 'singleChoice' | 'multipleChoice' | 'text'
    title: string
    options: Array<{ id: string; text: string }>
    required: boolean
}

@Component({
    name: 'QuestionnaireEditor',
})
export default class QuestionnaireEditor extends Vue {
    @Prop({ type: Object, default: () => ({}) }) readonly questionnaireData!: Partial<QuestionnaireVO>
    @Prop({ type: Array, default: () => [] }) readonly questionsList!: Question[]
    @Prop({ type: Boolean, default: false }) readonly loading!: boolean

    private formData: Partial<QuestionnaireVO> = {
        title: '',
        description: '',
        isAnonymous: false,
        endTime: '',
    }

    private questions: Question[] = []

    get rules() {
        return {
            title: [{ required: true, message: '请输入问卷标题', trigger: 'blur' }],
        }
    }

    created() {
        this.initData()
    }

    @Watch('questionnaireData', { deep: true })
    onQuestionnaireDataChange() {
        this.initData()
    }

    @Watch('questionsList', { deep: true })
    onQuestionsListChange() {
        this.questions = JSON.parse(JSON.stringify(this.questionsList))
    }

    initData() {
        // 初始化表单数据
        this.formData = { ...this.questionnaireData }

        // 初始化问题数据
        this.questions = JSON.parse(JSON.stringify(this.questionsList))
    }

    /**
     * 基本信息变更时触发
     */
    @Emit('form-data-change')
    onFormDataChange() {
        return { ...this.formData }
    }

    @Emit('questions-change')
    onQuestionChange() {
        return this.questions
    }

    @Emit('add-question')
    addQuestion() {
        const newId = Date.now().toString()
        const newQuestion = {
            id: newId,
            type: 'singleChoice' as const,
            title: '',
            options: [
                { id: `${newId}-1`, text: '选项1' },
                { id: `${newId}-2`, text: '选项2' },
            ],
            required: false,
        }
        this.questions.push(newQuestion)
        return this.questions
    }

    @Emit('remove-question')
    removeQuestion(index: number) {
        this.questions.splice(index, 1)
        return this.questions
    }

    @Emit('add-option')
    addOption(question: Question) {
        const newId = `${question.id}-${question.options.length + 1}`
        question.options.push({
            id: newId,
            text: `选项${question.options.length + 1}`,
        })
        return this.questions
    }

    @Emit('remove-option')
    removeOption(question: Question, index: number) {
        question.options.splice(index, 1)
        return this.questions
    }

    async validate() {
        try {
            await (this.$refs.form as any).validate()

            // 检查问卷内容
            if (this.questions.length === 0) {
                throw new Error('请至少添加一个问题')
            }

            for (const question of this.questions) {
                if (!question.title) {
                    throw new Error('题目不能为空')
                }

                if (question.type !== 'text' && question.options.length < 2) {
                    throw new Error(`"${question.title}"至少需要两个选项`)
                }

                if (question.type !== 'text') {
                    for (const option of question.options) {
                        if (!option.text) {
                            throw new Error(`"${question.title}"的选项不能为空`)
                        }
                    }
                }
            }

            return {
                formData: {
                    ...this.formData,
                    content: JSON.stringify({ questions: this.questions }),
                },
                valid: true,
            }
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : '表单验证失败',
                valid: false,
            }
        }
    }

    @Emit('save')
    async saveQuestionnaire(status: string) {
        const validateResult = await this.validate()

        if (!validateResult.valid) {
            this.$message.warning(validateResult.error)
            return { success: false, message: validateResult.error }
        }

        return {
            formData: {
                ...validateResult.formData,
                status,
            },
            success: true,
        }
    }

    @Emit('cancel')
    cancel() {
        return true
    }
}
</script>

<style scoped lang="less">
.questionnaire-editor {
    height: 100%;
    overflow-y: auto;

    .mb-20 {
        margin-bottom: 20px;
    }

    .question-item {
        border: 1px dashed #dcdfe6;
        border-radius: 4px;
        padding: 15px;
        margin-bottom: 15px;
        position: relative;

        .question-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
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
    }

    .question-options {
        padding-left: 34px;

        .option-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
    }

    .add-question {
        margin-top: 20px;
        text-align: center;
    }

    .action-btns {
        margin-top: 20px;
        text-align: center;
    }
}
</style>
