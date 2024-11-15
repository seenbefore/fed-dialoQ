<template>
    <div class="exam-question">
        <!-- 顶部导航 -->
        <div class="nav">
            <div class="nav-item" :class="{ active: currentRole === 'manager' }" @click="switchRole('manager')">
                企业负责人
            </div>
            <div class="nav-item" :class="{ active: currentRole === 'safety' }" @click="switchRole('safety')">
                安全管理员
            </div>
        </div>

        <!-- 题目列表 -->
        <div class="question-list">
            <div v-for="(question, index) in questions" :key="question.id" class="question-item">
                <div class="question-header">
                    <span class="question-index">{{ index + 1 }}、</span>
                    <span class="question-type" :class="question.type">
                        {{ getQuestionTypeText(question.type) }}
                    </span>
                </div>

                <div class="question-title">
                    {{ question.title }}
                </div>

                <div class="options">
                    <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item" :class="{ 'judge-option': question.type === 'judge' }">
                        <span class="option-index" :class="{ 'judge-index': question.type === 'judge' }">
                            {{ question.type === 'judge' ? (optIndex === 0 ? 'A' : 'B') : String.fromCharCode(65 + optIndex) }}
                        </span>
                        {{ option }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { getQuestionList, QuestionType } from './api'

@Component({
    name: 'ExamQuestion',
})
export default class ExamQuestion extends Vue {
    private questions: any[] = []
    private currentRole: 'manager' | 'safety' = 'manager'

    async created() {
        await this.loadQuestions()
    }

    private getQuestionTypeText(type: QuestionType) {
        const typeMap = {
            [QuestionType.SINGLE]: '单选题',
            [QuestionType.MULTIPLE]: '多选题',
            [QuestionType.JUDGE]: '判断题',
        }
        return typeMap[type]
    }

    private async loadQuestions() {
        const res = await getQuestionList({ role: this.currentRole })
        if (res.code === 200) {
            this.questions = res.data
        }
    }

    private async switchRole(role: 'manager' | 'safety') {
        if (this.currentRole !== role) {
            this.currentRole = role
            await this.loadQuestions()
        }
    }
}
</script>

<style lang="less" scoped>
.exam-question {
    min-height: 100vh;
    background: #f5f5f5;

    .nav {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        padding: 12px 15px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

        .nav-item {
            flex: 1;
            text-align: center;
            padding: 8px 0;
            font-size: 15px;
            color: #666;
            position: relative;
            transition: all 0.3s;

            &.active {
                color: #1989fa;
                font-weight: 500;

                &:after {
                    content: '';
                    position: absolute;
                    bottom: -12px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 3px;
                    background: #1989fa;
                    border-radius: 2px;
                }
            }
        }
    }

    .question-list {
        padding: 15px;

        .question-item {
            background: #fff;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

            .question-header {
                display: flex;
                align-items: center;
                margin-bottom: 12px;

                .question-type {
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    margin-right: 8px;
                    color: #fff;

                    &.single {
                        background: #1989fa;
                    }

                    &.multiple {
                        background: #ff976a;
                    }

                    &.judge {
                        background: #07c160;
                    }
                }

                .question-index {
                    color: #999;
                    font-size: 14px;
                }
            }

            .question-title {
                font-size: 15px;
                line-height: 1.6;
                margin-bottom: 16px;
                color: #333;
                padding-left: 8px;
                border-left: 3px solid #1989fa;
            }

            .options {
                .option-item {
                    font-size: 14px;
                    line-height: 1.6;
                    margin-bottom: 12px;
                    color: #666;
                    display: flex;
                    align-items: center;
                    padding: 8px 12px;
                    background: #f8f8f8;
                    border-radius: 6px;
                    transition: all 0.3s;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    &:hover {
                        background: #f0f0f0;
                    }

                    &.judge-option {
                        width: 120px;
                    }

                    .option-index {
                        flex-shrink: 0;
                        width: 24px;
                        height: 24px;
                        line-height: 24px;
                        text-align: center;
                        background: #fff;
                        border-radius: 12px;
                        margin-right: 8px;
                        color: #666;
                        font-weight: 500;
                        border: 1px solid #ddd;

                        &.judge-index {
                            color: #07c160;
                            border-color: #07c160;
                        }
                    }
                }
            }
        }
    }
}
</style>
