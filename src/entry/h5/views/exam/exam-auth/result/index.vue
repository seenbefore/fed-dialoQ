<template>
    <div class="exam-auth-result">
        <div class="result-content">
            <!-- 头部图标 -->
            <div class="result-icon">
                <img :src="require(`./assets/fail.jpg`)" alt="认证结果" />
            </div>

            <!-- 标题 -->
            <div class="result-title">
                {{ authResult.success ? '认证成功' : '非常抱歉，认证失败' }}
            </div>

            <!-- 按钮 -->
            <div class="action-button">
                <van-button round block type="primary" @click="handleRetry">
                    重新认证
                </van-button>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { getAuthResult } from './api'

@Component({
    name: 'ExamAuthResult',
    components: {},
})
export default class ExamAuthResult extends Vue {
    private authResult = {
        success: false,
        message: '',
    }

    async created() {
        await this.loadAuthResult()
    }

    private async loadAuthResult() {
        const res = await getAuthResult()
        if (res.code === 200) {
            this.authResult = res.data
        }
    }

    private handleRetry() {
        this.$router.push('/exam/auth')
    }
}
</script>

<style lang="less" scoped>
.exam-auth-result {
    min-height: 100vh;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

    .result-content {
        width: 100%;
        text-align: center;
        margin-top: -100px;

        .result-icon {
            margin-bottom: 24px;

            img {
                width: 120px;
            }
        }

        .result-title {
            font-size: 18px;
            font-weight: 500;
            color: #333;
            margin-bottom: 16px;
        }

        .result-message {
            display: inline-flex;
            align-items: center;
            padding: 8px 16px;
            background: #fff7e6;
            border-radius: 4px;
            margin-bottom: 32px;
            color: #ff7d00;
            font-size: 14px;

            .van-icon {
                margin-right: 4px;
                font-size: 16px;
            }
        }

        .action-button {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 16px;
            background: #fff;
            box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);

            .van-button {
                height: 44px;
                font-size: 16px;
            }
        }
    }
}
</style>
