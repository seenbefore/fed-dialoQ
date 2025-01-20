<template>
    <div class="exam-result" :class="{ fail: !isPassed }">
        <!-- 结果内容 -->
        <div class="result-content">
            <!-- 标题 -->
            <div class="result-header" :class="{ fail: !isPassed }">
                <van-icon :name="isPassed ? 'success' : 'cross'" class="result-icon" />
                <span class="header-text">{{ isPassed ? '恭喜您，测评通过' : '非常抱歉，测评未通过' }}</span>
            </div>

            <!-- 分数 -->
            <div class="score-section" :class="{ fail: !isPassed }">
                <div class="score">{{ score }}</div>
                <div class="score-label">测评得分</div>
            </div>

            <!-- 考试信息 -->
            <div class="exam-info">
                <div class="info-row">
                    <div class="info-item">
                        <div class="label">姓名</div>
                        <div class="value">{{ userName }}</div>
                    </div>
                    <div class="info-item">
                        <div class="label">用时</div>
                        <div class="value">{{ duration }}分钟</div>
                    </div>
                    <div class="info-item">
                        <div class="label">答题总数</div>
                        <div class="value">{{ totalAnswered }}</div>
                    </div>
                </div>
            </div>

            <!-- 倒计时 -->
            <!-- <div class="countdown">
                <van-icon name="clock-o" />
                <span>还剩 23:58 测评结束</span>
            </div> -->

            <!-- 按钮 -->
            <div class="action-button" v-if="!isPassed">
                <van-button type="primary" block @click="handleRetry">重新答题</van-button>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getExamResult } from './api'
import { Button, Icon } from 'vant'

@Component({
    name: 'ExamResult',
    components: {
        [Button.name]: Button,
        [Icon.name]: Icon,
    },
})
export default class ExamResult extends Vue {
    @Prop() id!: string
    @Prop() score!: string
    @Prop() isPassed!: boolean
    @Prop() totalAnswered!: string
    @Prop() userName!: string
    @Prop() userId!: string
    @Prop() duration!: string

    private examResult: any = {
        score: 0,
        userName: '',
        usedTime: '',
        totalQuestions: 0,
    }

    // 及格分数线
    private readonly PASS_SCORE = 60

    async created() {
        await this.loadExamResult()
    }

    private async loadExamResult() {
        const examId = this.$route.params.id
        const res = await getExamResult(examId)
        this.examResult = res.data
    }

    private handleRetry() {
        const examId = this.$route.params.id
        // this.$router.push({
        //     path: '/exam/question',
        //     query: { examId },
        // })
        this.$router.go(-1)
    }
}
</script>

<style lang="less" scoped>
.exam-result {
    min-height: 100vh;
    background: linear-gradient(180deg, #4b8bf4 0%, #7cb8f7 100%);
    padding: 20px;
    box-sizing: border-box;

    &.fail {
        background: linear-gradient(180deg, #f56c6c 0%, #f78989 100%);
    }

    .result-content {
        background: #fff;
        border-radius: 12px;
        padding: 24px;
        text-align: center;

        .result-header {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;

            .result-icon {
                font-size: 24px;
                color: #fff;
                background: #07c160;
                border-radius: 50%;
                padding: 4px;
                margin-right: 8px;
            }

            .header-text {
                font-size: 18px;
                font-weight: 500;
                color: #333;
            }

            &.fail {
                .result-icon {
                    background: #ee0a24;
                }
            }
        }

        .score-section {
            margin-bottom: 32px;

            .score {
                font-size: 64px;
                font-weight: bold;
                color: #ff7d00;
                line-height: 1;
                margin-bottom: 8px;
                font-family: DIN;

                &::after {
                    content: '';
                    display: block;
                    width: 32px;
                    height: 4px;
                    background: #ff7d00;
                    margin: 8px auto 0;
                    border-radius: 2px;
                }
            }

            &.fail {
                .score {
                    color: #ee0a24;

                    &::after {
                        background: #ee0a24;
                    }
                }
            }

            .score-label {
                font-size: 14px;
                color: #666;
            }
        }

        .exam-info {
            background: #f4faff;
            border: 1px dashed rgba(49, 146, 228, 0.35);
            border-radius: 4px;
            padding: 16px;
            margin-bottom: 24px;

            .info-row {
                display: flex;
                justify-content: space-around;

                .info-item {
                    text-align: center;

                    .label {
                        font-size: 14px;
                        color: #999;
                        margin-bottom: 4px;
                    }

                    .value {
                        font-size: 16px;
                        color: #333;
                        font-weight: 500;
                    }
                }
            }
        }

        .countdown {
            display: flex;
            align-items: center;
            justify-content: center;
            // background: #fff7e6;
            // border: 1px solid #ff7d00;
            border-radius: 4px;
            padding: 12px;
            margin-bottom: 24px;
            color: #ff7d00;
            font-size: 14px;

            .van-icon {
                margin-right: 4px;
                font-size: 16px;
            }
        }

        .action-button {
            .van-button {
                height: 44px;
                font-size: 16px;
            }
        }
    }
}
</style>
