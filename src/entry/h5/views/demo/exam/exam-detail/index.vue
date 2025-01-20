<template>
    <div class="exam-detail">
        <!-- 顶部信息栏 -->
        <div class="exam-header">
            <div class="timer">
                <van-icon name="clock-o" />
                <span>还剩</span>
                <span>{{ formatTime }}</span>
                <span>测评结束</span>
            </div>
            <div class="text-size">
                <!-- <van-icon name="font" />
                <span>字号</span> -->
            </div>
            <div class="score">{{ currentIndex + 1 }}/{{ totalQuestions }}</div>
        </div>

        <!-- 题目内容 -->
        <div class="question-content" v-if="currentQuestion">
            <div class="inner">
                <div class="question-title">
                    <span class="question-index">{{ currentIndex + 1 }}、</span>
                    <span class="question-type">{{ questionTypeText }}/{{ questionScore }}分</span>
                    <div class="title-text">{{ currentQuestion.questionContent }}</div>
                </div>

                <div class="options-list">
                    <div v-for="option in parsedOptions" :key="option.code" class="option-item" :class="{ active: isOptionSelected(option.code) }" @click="handleSelectOption(option.code)">
                        <span class="option-label">{{ option.code }}</span>
                        <span class="option-text">{{ option.content }}</span>
                    </div>
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
            <van-button class="next-btn" block round @click="handleNextQuestion" type="primary">
                {{ isLastQuestion ? '提交' : '下一题' }}
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
                        v-for="(question, index) in allQuestions"
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
                    <van-button type="primary" block round @click="handleSubmit">提交</van-button>
                </div>
            </div>
        </van-popup>

        <!-- 考试结束弹窗 -->
        <van-dialog v-model="showExamEndDialog" :show-confirm-button="false" :show-cancel-button="false" class="exam-end-dialog" close-on-click-overlay>
            <div class="exam-end-content">
                <div class="exam-end-icon">
                    <van-icon name="clock-o" size="40" />
                </div>
                <div class="exam-end-text">测评已结束</div>
                <van-button plain block class="know-btn" @click="handleExamEnd">
                    知道了
                </van-button>
            </div>
        </van-dialog>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getExamDetail, submitAnswer, ExamPaperQuestion } from './api'

interface QuestionOption {
    code: string
    content: string
}

@Component({
    name: 'ExamDetail',
})
export default class ExamDetail extends Vue {
    @Prop() private id!: string
    private examData: ExamPaperQuestion | null = null
    private currentIndex = 0
    private answers: Record<string, string> = {}
    private timer = 0
    private remainingTime = 0
    private showAnswerCard = false
    private showExamEndDialog = false
    private startTime = ''

    get allQuestions() {
        if (!this.examData) return []
        return [...this.examData.singleChoiceQuestions, ...this.examData.multipleChoiceQuestions, ...this.examData.judgeQuestions]
    }

    get totalQuestions() {
        return this.examData?.totalQuestions || 0
    }

    get currentQuestion() {
        return this.allQuestions[this.currentIndex]
    }

    get isLastQuestion() {
        return this.currentIndex === this.allQuestions.length - 1
    }

    get parsedOptions(): QuestionOption[] {
        if (!this.currentQuestion) return []
        try {
            return JSON.parse(this.currentQuestion.questionOptions)
        } catch (e) {
            console.error('Failed to parse options:', e)
            return []
        }
    }

    get questionTypeText() {
        if (!this.examData) return ''
        const index = this.currentIndex
        if (index < this.examData.singleChoiceCount) return '单选'
        if (index < this.examData.singleChoiceCount + this.examData.multipleChoiceCount) return '多选'
        return '判断'
    }

    get questionScore() {
        if (!this.examData) return 0
        const index = this.currentIndex
        if (index < this.examData.singleChoiceCount) return this.examData.singleChoiceScore
        if (index < this.examData.singleChoiceCount + this.examData.multipleChoiceCount) return this.examData.multipleChoiceScore
        return this.examData.judgeScore
    }

    get formatTime() {
        const minutes = Math.floor(this.remainingTime / 60)
        const seconds = this.remainingTime % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    async created() {
        this.startTime = new Date().toISOString()
        await this.getExamDetail()
    }

    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    async getExamDetail() {
        try {
            const { data } = await getExamDetail({ id: this.id })
            this.examData = data
            this.remainingTime = data.duration * 60 // Convert minutes to seconds
            this.startTimer()
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
                this.showExamEndDialog = true
            }
        }, 1000)
    }

    isOptionSelected(value: string) {
        if (!this.currentQuestion) return false
        const answer = this.answers[this.currentQuestion.id]
        if (this.questionTypeText === '多选') {
            return answer?.includes(value) || false
        }
        return answer === value
    }

    handleSelectOption(value: string) {
        if (!this.currentQuestion) return

        if (this.questionTypeText === '多选') {
            let currentAnswers = this.answers[this.currentQuestion.id]?.split(',') || []
            const index = currentAnswers.indexOf(value)
            if (index > -1) {
                currentAnswers.splice(index, 1)
            } else {
                currentAnswers.push(value)
            }
            this.$set(this.answers, this.currentQuestion.id, currentAnswers.join(','))
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
        if (this.isLastQuestion) {
            this.$dialog
                .confirm({
                    title: '提示',
                    message: '确认提交答案？',
                })
                .then(() => {
                    this.handleSubmit()
                })
                .catch(() => {})
        } else {
            this.currentIndex++
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
        if (!this.examData) return

        try {
            const endTime = new Date().toISOString()
            const duration = Math.ceil((Date.parse(endTime) - Date.parse(this.startTime)) / 1000 / 60) // Convert to minutes

            const answerList = Object.entries(this.answers).map(([questionId, answer]) => ({
                questionId,
                userAnswer: answer,
            }))

            const { data } = await submitAnswer({
                userId: '', // TODO: Get from user context
                paperId: this.examData.id,
                startTime: this.startTime,
                endTime,
                answers: answerList,
                duration,
            })

            this.$router.replace({
                path: '/exam/result',
                query: {
                    id: this.examData.id,
                    score: data.score + '',
                    isPassed: data.isPassed,
                    totalAnswered: data.totalAnswered + '',
                    userName: data.userName,
                    userId: data.userId,
                    duration: data.duration + '',
                },
            })
        } catch (error) {
            console.error(error)
        }
    }

    private handleExamEnd() {
        this.showExamEndDialog = false
        this.handleSubmit()
    }
}
</script>

<style lang="less" scoped>
.exam-detail {
    min-height: 100vh;
    background: #f5f5f5;
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
            color: #ff7d00;
            font-weight: bold;

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
        padding: 50px 0px 80px;

        .inner {
            background: #fff;
            padding: 16px;
        }

        .question-title {
            margin-bottom: 24px;

            .question-index {
                font-size: 16px;
                font-weight: 500;
                color: #333;
                margin-right: 8px;
            }

            .question-type {
                display: inline-flex;
                font-size: 12px;
                background-color: #ddd;
                border-radius: 3px;
                padding: 4px 5px;
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

            font-size: 14px;
            color: #666;
            border-color: #ddd;

            .van-icon {
                margin-right: 4px;
                font-size: 16px;
            }
        }

        .prev-btn {
            width: 110px;
            height: 40px;
            padding: 0 16px;

            font-size: 14px;
            color: #666;
            border-color: #ddd;

            &:disabled {
                opacity: 0.5;
                background: #f5f5f5;
            }
        }

        .next-btn {
            width: 110px;
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

    :deep(.exam-end-dialog) {
        .van-dialog__content {
            padding: 20px;
        }

        .exam-end-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;

            .exam-end-icon {
                margin-bottom: 16px;
                .van-icon {
                    color: #666;
                }
            }

            .exam-end-text {
                font-size: 16px;
                color: #333;
                margin-bottom: 24px;
            }

            .know-btn {
                width: 100%;
                height: 44px;
                font-size: 16px;
                color: #1989fa;
                border-color: #ebedf0;
            }
        }
    }
}
</style>
