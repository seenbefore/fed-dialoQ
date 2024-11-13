<template>
    <div class="exam-detail">
        <!-- 顶部信息栏 -->
        <div class="exam-header">
            <div class="timer">
                <van-icon name="clock-o" />
                <span>{{ formatTime }}</span>
            </div>
            <div class="text-size">
                <!-- <van-icon name="font" />
                <span>字号</span> -->
            </div>
            <div class="score">
                <!-- <span class="correct">{{ correctCount }}</span>
                <span class="wrong">{{ wrongCount }}</span> -->
            </div>
        </div>

        <!-- 题目内容 -->
        <div class="question-content" v-if="currentQuestion">
            <div class="question-title">
                <span class="question-index">{{ currentIndex + 1 }}.</span>
                <span class="question-type">{{ questionTypeText }}</span>
                <div class="title-text">{{ currentQuestion.title }}</div>
            </div>

            <div class="options-list">
                <div v-for="option in currentQuestion.options" :key="option.value" class="option-item" :class="{ active: isOptionSelected(option.value) }" @click="handleSelectOption(option.value)">
                    <span class="option-label">{{ option.label }}</span>
                    <span class="option-text">{{ option.text }}</span>
                </div>
            </div>
        </div>

        <!-- 底部导航 -->
        <div class="exam-footer">
            <div class="footer-left">
                <van-button class="answer-card-btn" plain @click="handleShowAnswerCard">
                    <van-icon name="records" />
                    答题卡
                </van-button>
                <van-button class="prev-btn" plain @click="handlePrevQuestion" :disabled="currentIndex === 0">
                    上一题
                </van-button>
            </div>
            <van-button class="next-btn" color="#4080FF" block round @click="handleNextQuestion">
                下一题
            </van-button>
        </div>

        <!-- 答题卡弹窗 -->
        <van-popup v-model="showAnswerCard" position="bottom" round>
            <div class="answer-card">
                <div class="card-header">
                    <span>答题卡</span>
                    <van-icon name="cross" @click="showAnswerCard = false" />
                </div>
                <div class="card-content">
                    <div
                        v-for="(question, index) in questions"
                        :key="question.id"
                        class="question-item"
                        :class="{
                            active: index === currentIndex,
                            answered: answers[question.id],
                        }"
                        @click="handleJumpToQuestion(index)"
                    >
                        {{ index + 1 }}
                    </div>
                </div>
                <div class="card-footer">
                    <van-button type="primary" block round @click="handleSubmit" color="#4080FF">提交</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { getExamDetail, submitAnswer } from './api'

@Component({
    name: 'ExamDetail',
})
export default class ExamDetail extends Vue {
    private examId = ''
    private questions: any[] = []
    private currentIndex = 0
    private answers: Record<string, string | string[]> = {}
    private timer = 0
    private remainingTime = 0
    private showAnswerCard = false
    private correctCount = 0
    private wrongCount = 0

    get currentQuestion() {
        return this.questions[this.currentIndex]
    }

    get selectedAnswer() {
        return this.currentQuestion ? this.answers[this.currentQuestion.id] : ''
    }

    get formatTime() {
        const minutes = Math.floor(this.remainingTime / 60)
        const seconds = this.remainingTime % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    get questionTypeText() {
        if (!this.currentQuestion) return ''

        const typeMap: Record<string, string> = {
            single: '单选',
            multiple: '多选',
            judge: '判断',
        }

        return typeMap[this.currentQuestion.type] || ''
    }

    async created() {
        this.examId = this.$route.params.id
        await this.getExamDetail()
    }

    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    async getExamDetail() {
        try {
            const res = await getExamDetail({ id: this.examId })
            if (res.code === 200) {
                this.questions = res.data.questions
                this.remainingTime = res.data.duration
                this.startTimer()
            }
        } catch (error) {
            console.error(error)
        }
    }

    startTimer() {
        this.timer = window.setInterval(() => {
            if (this.remainingTime > 0) {
                this.remainingTime--
            } else {
                clearInterval(this.timer)
                this.handleSubmit()
            }
        }, 1000)
    }

    isOptionSelected(value: string) {
        if (!this.currentQuestion) return false
        const answer = this.answers[this.currentQuestion.id]
        if (this.currentQuestion.type === 'multiple') {
            return Array.isArray(answer) && answer.includes(value)
        }
        return answer === value
    }

    handleSelectOption(value: string) {
        if (!this.currentQuestion) return

        if (this.currentQuestion.type === 'multiple') {
            let currentAnswers = (this.answers[this.currentQuestion.id] as string[]) || []
            if (!Array.isArray(currentAnswers)) {
                currentAnswers = []
            }

            const index = currentAnswers.indexOf(value)
            if (index > -1) {
                currentAnswers.splice(index, 1)
            } else {
                currentAnswers.push(value)
            }

            this.$set(this.answers, this.currentQuestion.id, currentAnswers)
        } else {
            this.$set(this.answers, this.currentQuestion.id, value)
        }
    }

    handlePrevQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--
        }
    }

    handleNextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++
        } else {
            // 如果是最后一题，显示提交确认
            this.$dialog
                .confirm({
                    title: '提示',
                    message: '已经是最后一题，是否提交答案？',
                })
                .then(() => {
                    this.handleSubmit()
                })
                .catch(() => {})
        }
    }

    handleJumpToQuestion(index: number) {
        this.currentIndex = index
        this.showAnswerCard = false
    }

    handleShowAnswerCard() {
        this.showAnswerCard = true
    }

    async handleSubmit() {
        try {
            const answerList = Object.entries(this.answers).map(([questionId, answer]) => {
                const question = this.questions.find(q => q.id.toString() === questionId)
                return {
                    questionId: Number(questionId),
                    answer: Array.isArray(answer) ? answer.join(',') : answer,
                }
            })

            await submitAnswer({
                examId: this.examId,
                answers: answerList,
            })

            this.$router.push({
                name: 'ExamResult',
                params: { id: this.examId },
            })
        } catch (error) {
            console.error(error)
        }
    }
}
</script>

<style lang="less" scoped>
.exam-detail {
    min-height: 100vh;
    background: #fff;
    display: flex;
    flex-direction: column;

    .exam-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 44px;
        background: #fff;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        z-index: 100;

        .timer {
            display: flex;
            align-items: center;
            color: #666;

            .van-icon {
                margin-right: 4px;
            }
        }

        .text-size {
            display: flex;
            align-items: center;
            color: #666;

            .van-icon {
                margin-right: 4px;
            }
        }

        .score {
            display: flex;
            align-items: center;

            .correct {
                color: #00b578;
                margin-right: 8px;
            }

            .wrong {
                color: #ff4d4f;
            }
        }
    }

    .question-content {
        flex: 1;
        padding: 60px 16px 80px;

        .question-title {
            margin-bottom: 24px;

            .question-index {
                font-size: 16px;
                font-weight: 500;
                color: #333;
                margin-right: 8px;
            }

            .question-type {
                font-size: 12px;
                color: #666;
                margin-right: 8px;
            }

            .title-text {
                font-size: 16px;
                color: #333;
                line-height: 1.5;
                margin-top: 8px;
            }
        }

        .options-list {
            .option-item {
                display: flex;
                align-items: center;
                padding: 12px 16px;
                margin-bottom: 12px;
                background: #f5f5f5;
                border-radius: 4px;
                cursor: pointer;
                position: relative;

                &.active {
                    background: #e6f7ff;
                    border: 1px solid #91d5ff;

                    &::after {
                        content: '✓';
                        position: absolute;
                        right: 16px;
                        color: #1890ff;
                    }
                }

                .option-label {
                    font-size: 14px;
                    color: #666;
                    margin-right: 12px;
                }

                .option-text {
                    flex: 1;
                    font-size: 14px;
                    color: #333;
                    line-height: 1.5;
                }
            }
        }
    }

    .exam-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 64px;
        background: #fff;
        border-top: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;

        .footer-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .answer-card-btn {
            height: 40px;
            padding: 0 16px;
            border-radius: 20px;
            font-size: 14px;
            color: #666;
            border-color: #ddd;

            .van-icon {
                margin-right: 4px;
                font-size: 16px;
            }
        }

        .prev-btn {
            height: 40px;
            padding: 0 16px;
            border-radius: 20px;
            font-size: 14px;
            color: #666;
            border-color: #ddd;

            &:disabled {
                opacity: 0.5;
                background: #f5f5f5;
            }
        }

        .next-btn {
            width: 160px;
            height: 40px;
            font-size: 16px;
            font-weight: 400;
        }
    }

    .answer-card {
        padding: 16px;

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;

            span {
                font-size: 16px;
                font-weight: 500;
            }
        }

        .card-content {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
            margin-bottom: 24px;

            .question-item {
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f5f5f5;
                border-radius: 4px;
                font-size: 14px;
                color: #333;
                cursor: pointer;

                &.active {
                    background: #e6f7ff;
                    color: #1890ff;
                }

                &.answered {
                    background: #e6f7ff;
                    border: 1px solid #91d5ff;
                }
            }
        }

        .card-footer {
            padding: 0 16px;
        }
    }
}
</style>
