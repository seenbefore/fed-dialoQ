<template>
    <div class="exam-question">
        <!-- 顶部导航 -->
        <div class="nav">
            <div class="nav-item" :class="{ active: currentRole === 'manager' }" @click="switchRole('manager')">企业负责人</div>
            <div class="nav-item" :class="{ active: currentRole === 'safety' }" @click="switchRole('safety')">
                安全管理员
            </div>
        </div>

        <!-- 题目列表容器 -->
        <div class="question-container" ref="scrollContainer">
            <van-list v-model="View.loading" :finished="View.finished" finished-text="没有更多题目了" @load="onLoad">
                <div v-for="(question, index) in questions" :key="question.id" class="question-item">
                    <!-- 题目类型和序号 -->
                    <div class="question-type">{{ index + 1 }}. {{ getQuestionTypeText(question.type) }}</div>

                    <!-- 题目内容 -->
                    <div class="question-title">
                        {{ question.title }}
                    </div>

                    <!-- 选项列表 -->
                    <div class="options">
                        <div v-for="(option, optIndex) in question.options" :key="optIndex" class="option-item">
                            <span class="option-label">{{ String.fromCharCode(65 + optIndex) }}</span>
                            {{ option }}
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { getQuestionList, QuestionType } from './api'

@Component({
    name: 'ExamQuestion',
    components: {},
})
export default class ExamQuestion extends Vue {
    private questions: any[] = []
    private currentRole: 'manager' | 'safety' = 'manager'
    private currentPage = 1
    private pageSize = 10
    private View = {
        loading: false,
        finished: false,
    }

    // async created() {
    //     await this.loadQuestions()
    // }

    private getQuestionTypeText(type: QuestionType) {
        const typeMap = {
            [QuestionType.SINGLE]: '单选题',
            [QuestionType.MULTIPLE]: '多选题',
            [QuestionType.JUDGE]: '判断题',
        }
        return typeMap[type]
    }

    private async loadQuestions(isLoadMore = false) {
        try {
            console.log('loadQuestions', this.currentPage, this.currentRole)
            const res = await getQuestionList({
                role: this.currentRole,
                page: this.currentPage,
                pageSize: this.pageSize,
            })

            if (res.code === 200) {
                if (isLoadMore) {
                    this.questions.push(...res.data.list)
                } else {
                    this.questions = res.data.list
                }
                // 更新加载完成状态
                this.View.finished = !res.data.hasMore
                this.currentPage++
            }
        } finally {
            this.View.loading = false
        }
    }

    private async onLoad() {
        await this.loadQuestions(true)
    }

    private async switchRole(role: 'manager' | 'safety') {
        if (this.currentRole !== role) {
            // 滚动到顶部
            const scrollContainer = this.$refs.scrollContainer as HTMLElement
            if (scrollContainer) {
                // 使用平滑滚动
                scrollContainer.scrollTo({
                    top: 0,
                    //behavior: 'smooth',
                })
            }
            setTimeout(async () => {
                // 重置状态
                this.currentRole = role
                this.currentPage = 1
                this.View.finished = false
                this.questions = []
                this.View.loading = true

                await this.loadQuestions()
            }, 200)
        }
    }
}
</script>

<style lang="less" scoped>
.exam-question {
    min-height: 100vh;
    height: 100vh;
    background: #f5f5f5;
    display: flex;
    flex-direction: column;

    .nav {
        flex-shrink: 0;
        display: flex;
        padding: 12px 15px;
        background: #fff;

        .nav-item {
            flex: 1;
            text-align: center;
            padding: 8px 0;
            font-size: 15px;
            color: #666;
            position: relative;

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

    .question-container {
        flex: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        padding: 10px 0;

        .van-list {
            .question-item {
                background: #fff;
                padding: 20px;
                margin: 0 12px 8px;

                .question-type {
                    font-size: 16px;
                    font-weight: 500;
                    color: #333;
                    margin-bottom: 12px;
                }

                .question-title {
                    font-size: 15px;
                    line-height: 1.6;
                    color: #333;
                    margin-bottom: 16px;
                }

                .options {
                    .option-item {
                        background: #f7f8fa;
                        padding: 16px;
                        border-radius: 8px;
                        font-size: 15px;
                        color: #333;
                        margin-bottom: 8px;
                        display: flex;
                        align-items: flex-start;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        .option-label {
                            margin-right: 8px;
                            color: #333;
                            font-weight: normal;
                        }
                    }
                }
            }
        }

        .van-list__finished-text {
            color: #999;
            font-size: 14px;
            padding: 16px 0;
            text-align: center;
        }

        .van-list__loading {
            padding: 16px 0;
        }
    }
}
</style>
