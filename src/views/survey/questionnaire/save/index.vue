<template>
    <admin-page class="QuestionnaireSavePreview" back-url="/survey/questionnaire">
        <template #title>
            <span>{{ pageTitle }}</span>
        </template>

        <div class="page-content" v-loading="loading">
            <el-row :gutter="20">
                <!-- 左侧编辑区域 -->
                <el-col :span="8" class="editor-col">
                    <questionnaire-editor
                        :questionnaire-data="formData"
                        :questions-list="questions"
                        :loading="loading"
                        @form-data-change="onFormDataChange"
                        @questions-change="onQuestionsChange"
                        @add-question="onQuestionsChange"
                        @remove-question="onQuestionsChange"
                        @add-option="onQuestionsChange"
                        @remove-option="onQuestionsChange"
                        @save="handleSave"
                        @cancel="handleCancel"
                    />
                </el-col>

                <!-- 中间预览区域 -->
                <el-col :span="8" class="preview-col">
                    <div class="preview-header">
                        <span class="preview-title">预览效果</span>
                    </div>
                    <div class="preview-container">
                        <questionnaire-preview :questionnaire="{}" :form-data="formData" :questions="questions" :loading="loading" />
                    </div>
                </el-col>

                <!-- 右侧AI对话区域 -->
                <el-col :span="8" class="chat-col">
                    <div class="chat-header">
                        <span class="chat-title">AI助手</span>
                    </div>
                    <div class="chat-container">
                        <my-chat model-name="问卷设计助手" :welcome-message="welcomeMessage" />
                    </div>
                </el-col>
            </el-row>
        </div>
    </admin-page>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { detail, save, QuestionnaireVO } from '../api'
import { QuestionnaireStatusEnum } from '../enum'
import QuestionnaireEditor, { Question } from '../components/QuestionnaireEditor.vue'
import QuestionnairePreview from '../components/QuestionnairePreview.vue'
import MyChat from '@/components/global/my-chat/index.vue'

@Component({
    name: 'QuestionnaireSavePreview',
    components: {
        QuestionnaireEditor,
        QuestionnairePreview,
        MyChat,
    },
})
export default class QuestionnaireSavePreview extends Vue {
    private loading = false
    private formData: Partial<QuestionnaireVO> = {
        title: '',
        description: '',
        isAnonymous: false,
        endTime: '',
    }
    private questions: Question[] = []
    private welcomeMessage = '您好！我是问卷设计助手，可以帮您：\n\n1. 设计有效的问卷问题\n2. 提供问卷设计建议\n3. 优化问题和选项\n4. 分析问卷结构\n\n请告诉我您需要设计什么类型的问卷？'

    get pageTitle() {
        if (this.isEdit) {
            return '编辑问卷'
        } else {
            return '新增问卷'
        }
    }

    get isEdit() {
        return this.$route.query.action === 'edit'
    }

    created() {
        this.initData()
    }

    async initData() {
        const id = this.$route.query.id as string
        if (id) {
            try {
                this.loading = true
                const { data } = await detail({ id })
                this.formData = {
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    isAnonymous: data.isAnonymous,
                    endTime: data.endTime,
                }

                // 解析问卷内容
                if (data.content) {
                    try {
                        const content = JSON.parse(data.content)
                        this.questions = content.questions || []
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
    }

    onFormDataChange(data: Partial<QuestionnaireVO>) {
        this.formData = { ...data }
    }

    onQuestionsChange(questions: Question[]) {
        this.questions = questions
    }

    async handleSave(result: { formData: Partial<QuestionnaireVO>; success: boolean }) {
        if (!result.success) return

        try {
            this.loading = true
            await save(result.formData as any)
            this.$message.success('保存成功')
            this.$router.push('/survey/questionnaire')
        } catch (error) {
            console.error('保存问卷失败', error)
            this.$message.error('保存失败，请重试')
        } finally {
            this.loading = false
        }
    }

    handleCancel() {
        this.$router.push('/survey/questionnaire')
    }
}
</script>

<style scoped lang="less">
.QuestionnaireSavePreview {
    .page-content {
        height: calc(100vh - 120px);
    }

    .editor-col,
    .preview-col,
    .chat-col {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .editor-col {
        border-right: 1px solid #eee;
        padding-right: 10px;
    }

    .preview-col {
        border-right: 1px solid #eee;

        .preview-header {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            margin-bottom: 10px;

            .preview-title {
                font-size: 16px;
                font-weight: bold;
            }
        }

        .preview-container {
            flex: 1;
            overflow: auto;
        }
    }

    .chat-col {
        .chat-header {
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            margin-bottom: 10px;

            .chat-title {
                font-size: 16px;
                font-weight: bold;
            }
        }

        .chat-container {
            flex: 1;
            overflow: hidden;
        }
    }
}
</style>
