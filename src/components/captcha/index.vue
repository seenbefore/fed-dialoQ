<template>
    <div class="captcha-container" @click="refreshCaptcha" v-loading="loading">
        <img :src="captchaUrl" alt="验证码" width="100%" height="100%" v-if="captchaUrl" />
    </div>
</template>

<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'Captcha',
})
export default class Captcha extends Vue {
    /** 获取验证码的异步函数 */
    @Prop({ type: Function, required: true }) getCaptcha!: () => Promise<string>

    private captchaUrl = ''
    private loading = false

    async mounted() {
        await this.refreshCaptcha()
    }

    async refreshCaptcha() {
        try {
            this.captchaUrl = ''
            this.loading = true
            this.captchaUrl = await this.getCaptcha()
        } catch (error) {
            console.error('获取验证码失败:', error)
            this.$message.error('获取验证码失败，请稍后重试')
        } finally {
            this.loading = false
        }
    }
}
</script>

<style lang="less" scoped>
.captcha-container ::v-deep {
    cursor: pointer;
    width: 110px;
    height: 100%;
    img {
        vertical-align: top;
    }
    .el-loading-spinner .circular {
        width: 24px;
        height: 24px;
        margin-top: 10px;
    }
}
</style>
