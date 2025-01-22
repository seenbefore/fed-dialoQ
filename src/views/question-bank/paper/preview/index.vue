<template>
    <div class="sg-page icinfo-ai QuestionPaperPreview">
        <!-- 试卷头部 -->
        <div class="paper-header">
            <h2 class="paper-title">{{ paperData.paperName }}</h2>
            <div class="paper-info">
                <span>考试时长：{{ paperData.duration }}分钟</span>
                <span>总分：{{ paperData.totalScore }}分</span>
                <span>及格分：{{ paperData.passScore }}分</span>
            </div>
            <!-- <div class="paper-desc" v-if="paperData.paperDesc">
                <p>{{ paperData.paperDesc }}</p>
            </div> -->
        </div>
        <div class="pager-content">
            <!-- 单选题 -->
            <div class="question-section" v-if="paperData.singleChoiceQuestions && paperData.singleChoiceQuestions.length">
                <h3 class="section-title">一、单选题（每题{{ paperData.singleChoiceScore }}分）</h3>
                <div class="question-list">
                    <div v-for="(item, index) in paperData.singleChoiceQuestions" :key="item.id" class="question-item">
                        <div class="question-title">{{ index + 1 }}、{{ item.questionContent }}</div>
                        <div class="options">
                            <template v-for="option in parseOptions(item.questionOptions)">
                                <div :key="option.code" class="option-item" :class="{ 'correct-answer': showAnswer && item.correctAnswer === option.code }">
                                    <span class="option-label">{{ option.code }}.</span>
                                    <span class="option-content">{{ option.content }}</span>
                                    <span v-if="showAnswer && item.correctAnswer === option.code" class="correct-icon">✓</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 多选题 -->
            <div class="question-section" v-if="paperData.multipleChoiceQuestions && paperData.multipleChoiceQuestions.length">
                <h3 class="section-title">二、多选题（每题{{ paperData.multipleChoiceScore }}分）</h3>
                <div class="question-list">
                    <div v-for="(item, index) in paperData.multipleChoiceQuestions" :key="item.id" class="question-item">
                        <div class="question-title">{{ index + 1 }}、{{ item.questionContent }}</div>
                        <div class="options">
                            <template v-for="option in parseOptions(item.questionOptions)">
                                <div :key="option.code" class="option-item" :class="{ 'correct-answer': showAnswer && item.correctAnswer.split(',').includes(option.code) }">
                                    <span class="option-label">{{ option.code }}.</span>
                                    <span class="option-content">{{ option.content }}</span>
                                    <span v-if="showAnswer && item.correctAnswer.split(',').includes(option.code)" class="correct-icon">✓</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 判断题 -->
            <div class="question-section" v-if="paperData.judgeQuestions && paperData.judgeQuestions.length">
                <h3 class="section-title">三、判断题（每题{{ paperData.judgeScore }}分）</h3>
                <div class="question-list">
                    <div v-for="(item, index) in paperData.judgeQuestions" :key="item.id" class="question-item">
                        <div class="question-title">{{ index + 1 }}、{{ item.questionContent }}</div>
                        <div class="options">
                            <div class="option-item" :class="{ 'correct-answer': showAnswer && item.correctAnswer === '1' }">
                                <span class="option-label">A.</span>
                                <span class="option-content">正确</span>
                                <span v-if="showAnswer && item.correctAnswer === '1'" class="correct-icon">✓</span>
                            </div>
                            <div class="option-item" :class="{ 'correct-answer': showAnswer && item.correctAnswer === '0' }">
                                <span class="option-label">B.</span>
                                <span class="option-content">错误</span>
                                <span v-if="showAnswer && item.correctAnswer === '0'" class="correct-icon">✓</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部操作栏 -->
        <div class="paper-footer">
            <el-button type="primary" @click="toggleAnswer">{{ showAnswer ? '隐藏答案' : '显示答案' }}</el-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getExamPaperPreview, PaperPreviewVO, QuestionOption } from '../api'

@Component({
    name: 'QuestionPaperPreview',
})
export default class QuestionPaperPreview extends Vue {
    @Prop() id!: string

    paperData: PaperPreviewVO = {} as PaperPreviewVO
    showAnswer = true

    async mounted() {
        await this.loadPaperDetail()
    }

    async loadPaperDetail() {
        try {
            const { data } = await getExamPaperPreview({ id: this.id })
            this.paperData = data
        } catch (error) {
            console.error(error)
        }
    }

    parseOptions(optionsStr: string): QuestionOption[] {
        try {
            return JSON.parse(optionsStr)
        } catch (e) {
            console.error('解析选项失败:', e)
            return []
        }
    }

    toggleAnswer() {
        this.showAnswer = !this.showAnswer
    }

    goBack() {
        this.$back({
            path: '/question-bank/paper',
        })
    }
}
</script>

<style lang="less" scoped>
.QuestionPaperPreview {
    display: flex !important;
    flex-direction: column !important;
    padding: 0 !important;

    .paper-header {
        text-align: center;
        margin-bottom: 30px;

        .paper-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
        }

        .paper-info {
            color: #666;
            span {
                margin: 0 10px;
            }
        }

        .paper-desc {
            margin-top: 15px;
            color: #666;
            font-size: 14px;
            text-align: left;
            padding: 0 20px;
        }
    }

    .question-section {
        margin-bottom: 30px;

        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            padding-left: 10px;
            border-left: 4px solid #409eff;
        }

        .question-list {
            .question-item {
                margin-bottom: 25px;
                padding: 0 20px;

                .question-title {
                    margin-bottom: 15px;
                    line-height: 1.6;
                }

                .options {
                    .option-item {
                        position: relative;
                        margin-bottom: 10px;
                        line-height: 1.6;
                        padding: 8px 20px;
                        border-radius: 4px;
                        transition: all 0.3s;
                        display: flex;
                        align-items: center;
                        border: 1px solid transparent;

                        &:hover {
                            background-color: #f5f7fa;
                        }

                        .option-label {
                            width: 25px;
                            font-weight: bold;
                        }

                        .option-content {
                            flex: 1;
                        }

                        .correct-icon {
                            position: absolute;
                            right: 15px;
                            color: #67c23a;
                            font-weight: bold;
                        }

                        &.correct-answer {
                            background-color: #f0f9eb;
                            color: #67c23a;
                            border-color: #c2e7b0;
                        }
                    }
                }
            }
        }
    }

    .paper-footer {
        padding: 15px 20px;
        background: #fff;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        z-index: 10;
    }

    .pager-content {
        flex: 1;
        overflow: auto;
        padding: 20px;
    }
}
</style>
