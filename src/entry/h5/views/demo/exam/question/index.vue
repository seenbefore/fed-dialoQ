<template>
    <AppPage class="exam-question">
        <!-- 题目分类选择 -->
        <div class="category-tabs">
            <van-tabs v-model="currentCategoryIndex" sticky>
                <van-tab v-for="category in questionCategories" :key="category.subCategoryCode" :title="category.subCategoryName">
                    <!-- 题目类型导航 -->
                    <div class="question-type-nav">
                        <div
                            v-for="(type, index) in questionTypes"
                            :key="type.value"
                            class="nav-item"
                            :class="{ active: currentQuestionType === type.value }"
                            @click="currentQuestionType = type.value"
                        >
                            {{ type.label }}
                        </div>
                    </div>

                    <!-- 题目列表 -->
                    <div class="question-list">
                        <template v-if="currentQuestions.length">
                            <div v-for="(question, index) in currentQuestions" :key="question.id" class="question-item">
                                <div class="question-title">{{ index + 1 }}. {{ question.questionContent }}</div>
                                <div class="options">
                                    <div v-for="option in parseOptions(question.questionOptions)" :key="option.code" class="option-item">
                                        <span class="option-label">{{ option.code }}</span>
                                        {{ option.content }}
                                    </div>
                                </div>
                                <div class="answer">
                                    <span class="label">正确答案：</span>
                                    <span class="content">{{ question.correctAnswer }}</span>
                                </div>
                            </div>
                        </template>
                        <van-empty v-else description="暂无题目" />
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </AppPage>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { getQuestionStudyList, parseQuestionOptions, QuestionCategory, QuestionType } from './api'
import AppPage from '@/components/h5/AppPage/index.vue'

@Component({
    name: 'ExamQuestion',
    components: {
        AppPage,
    },
})
export default class ExamQuestion extends Vue {
    private questionCategories: QuestionCategory[] = []
    private currentCategoryIndex = 0
    private currentQuestionType: QuestionType = QuestionType.SINGLE

    private questionTypes = [
        { label: '单选题', value: QuestionType.SINGLE },
        { label: '多选题', value: QuestionType.MULTIPLE },
        { label: '判断题', value: QuestionType.JUDGE },
    ]

    get currentCategory(): QuestionCategory | null {
        return this.questionCategories[this.currentCategoryIndex] || null
    }

    get currentQuestions(): any[] {
        if (!this.currentCategory) return []

        switch (this.currentQuestionType) {
            case QuestionType.SINGLE:
                return this.currentCategory.singleChoiceQuestions || []
            case QuestionType.MULTIPLE:
                return this.currentCategory.multipleChoiceQuestions || []
            case QuestionType.JUDGE:
                return this.currentCategory.judgeQuestions || []
            default:
                return []
        }
    }

    parseOptions(optionsStr: string) {
        return parseQuestionOptions(optionsStr)
    }

    async created() {
        await this.loadQuestions()
    }

    private async loadQuestions() {
        try {
            const res = await getQuestionStudyList()
            this.questionCategories = res.data
        } catch (error) {
            console.error('加载题目失败:', error)
            this.$toast('加载题目失败')
        }
    }
}
</script>

<style lang="less" scoped>
.exam-question {
    background: #f5f5f5;
    min-height: 100vh;

    .category-tabs {
        background: #fff;
    }

    .question-type-nav {
        display: flex;
        padding: 12px 16px;
        background: #fff;
        border-bottom: 1px solid #eee;

        .nav-item {
            padding: 6px 12px;
            margin-right: 12px;
            border-radius: 4px;
            font-size: 14px;
            color: #666;
            background: #f5f5f5;

            &.active {
                color: #fff;
                background: #1989fa;
            }
        }
    }

    .question-list {
        padding: 16px;

        .question-item {
            background: #fff;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;

            .question-title {
                font-size: 15px;
                color: #333;
                line-height: 1.5;
                margin-bottom: 12px;
            }

            .options {
                .option-item {
                    display: flex;
                    align-items: flex-start;
                    padding: 8px 12px;
                    background: #f7f8fa;
                    border-radius: 4px;
                    margin-bottom: 8px;
                    font-size: 14px;
                    color: #333;

                    .option-label {
                        flex-shrink: 0;
                        width: 24px;
                        color: #666;
                    }
                }
            }

            .answer {
                margin-top: 12px;
                font-size: 14px;

                .label {
                    color: #666;
                }

                .content {
                    color: #1989fa;
                    font-weight: 500;
                }
            }
        }
    }
}
</style>
