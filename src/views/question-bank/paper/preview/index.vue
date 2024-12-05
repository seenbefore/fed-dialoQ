<template>
    <div class="sg-page icinfo-ai QuestionPaperPreview">
        <!-- 试卷头部 -->
        <div class="paper-header">
            <h2 class="paper-title">{{ paperData.title }}</h2>
            <div class="paper-info">
                <span>考试时长：{{ paperData.duration }}分钟</span>
                <span>总分：{{ paperData.grade_score }}分</span>
            </div>
        </div>
        <div class="pager-content">
            <!-- 单选题 -->
            <div class="question-section" v-if="paperData.danList.length">
                <h3 class="section-title">一、单选题（每题{{ paperData.dan_grade }}分）</h3>
                <div class="question-list">
                    <div v-for="(item, index) in paperData.danList" :key="item.id" class="question-item">
                        <div class="question-title">{{ index + 1 }}、{{ item.title }} {{ item.answer }}</div>
                        <div class="options">
                            <div class="option-item" v-if="item.option1" :class="{ 'correct-answer': showAnswer && item.answer === 'A' }">
                                <span class="option-label">A.</span>
                                <span class="option-content">{{ item.option1 }}</span>
                                <span v-if="showAnswer && item.answer === 'A'" class="correct-icon">✓</span>
                            </div>
                            <div class="option-item" v-if="item.option2" :class="{ 'correct-answer': showAnswer && item.answer === 'B' }">
                                <span class="option-label">B.</span>
                                <span class="option-content">{{ item.option2 }}</span>
                                <span v-if="showAnswer && item.answer === 'B'" class="correct-icon">✓</span>
                            </div>
                            <div class="option-item" v-if="item.option3" :class="{ 'correct-answer': showAnswer && item.answer === 'C' }">
                                <span class="option-label">C.</span>
                                <span class="option-content">{{ item.option3 }}</span>
                                <span v-if="showAnswer && item.answer === 'C'" class="correct-icon">✓</span>
                            </div>
                            <div class="option-item" v-if="item.option4" :class="{ 'correct-answer': showAnswer && item.answer === 'D' }">
                                <span class="option-label">D.</span>
                                <span class="option-content">{{ item.option4 }}</span>
                                <span v-if="showAnswer && item.answer === 'D'" class="correct-icon">✓</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 多选题 -->
            <div class="question-section" v-if="paperData.duoList.length">
                <h3 class="section-title">二、多选题（每题{{ paperData.duo_grade }}分）</h3>
                <div class="question-list">
                    <div v-for="(item, index) in paperData.duoList" :key="item.id" class="question-item">
                        <div class="question-title">{{ index + 1 }}、{{ item.title }}</div>
                        <div class="options">
                            <div class="option-item" v-if="item.option1" :class="{ 'correct-answer': showAnswer && item.answer.includes('A') }">
                                <span class="option-label">A.</span>
                                <span class="option-content">{{ item.option1 }}</span>
                                <span v-if="showAnswer && item.answer.includes('A')" class="correct-icon">✓</span>
                            </div>
                            <div class="option-item" v-if="item.option2" :class="{ 'correct-answer': showAnswer && item.answer.includes('B') }">
                                <span class="option-label">B.</span>
                                <span class="option-content">{{ item.option2 }}</span>
                                <span v-if="showAnswer && item.answer.includes('B')" class="correct-icon">✓</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 判断题 -->
            <div class="question-section" v-if="paperData.panList.length">
                <h3 class="section-title">三、判断题（每题{{ paperData.pan_grade }}分）</h3>
                <div class="question-list">
                    <div v-for="(item, index) in paperData.panList" :key="item.id" class="question-item">
                        <div class="question-title">{{ index + 1 }}、{{ item.title }}</div>
                        <div class="options" v-if="showAnswer">
                            <div class="option-item" :class="{ 'correct-answer': showAnswer && item.answer === '1' }">
                                <span class="option-label">A.</span>
                                <span class="option-content">正确</span>
                                <span v-if="showAnswer && item.answer === '1'" class="correct-icon">✓</span>
                            </div>
                            <div class="option-item" :class="{ 'correct-answer': showAnswer && item.answer === '0' }">
                                <span class="option-label">B.</span>
                                <span class="option-content">错误</span>
                                <span v-if="showAnswer && item.answer === '0'" class="correct-icon">✓</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 底部操作栏 -->
        <div class="paper-footer">
            <el-button type="primary" @click="toggleAnswer">{{ showAnswer ? '隐藏答案' : '显示答案' }}</el-button>
            <el-button @click="goBack">返回</el-button>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getPaperDetail } from './api'

@Component({
    name: 'QuestionPaperPreview',
})
export default class QuestionPaperPreview extends Vue {
    @Prop() id!: string

    paperData: Record<string, any> = {}
    showAnswer = true

    async mounted() {
        await this.loadPaperDetail()
    }

    async loadPaperDetail() {
        try {
            const { data } = await getPaperDetail({ id: this.$route.query.id })
            this.paperData = data
        } catch (error) {
            console.error(error)
        }
    }

    toggleAnswer() {
        this.showAnswer = !this.showAnswer
    }

    goBack() {
        this.$router.back()
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
