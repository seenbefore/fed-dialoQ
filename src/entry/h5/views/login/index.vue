<template>
    <AppPage class="login-page">
        <div class="login-container">
            <div class="login-header">
                <h1>欢迎登录</h1>
                <p>请输入您的账号和密码</p>
            </div>

            <van-form @submit="handleSubmit">
                <van-field v-model="formData.username" name="username" label="用户名" placeholder="请输入用户名" :rules="[{ required: true, message: '请输入用户名' }]" />
                <van-field v-model="formData.password" type="password" name="password" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]" />
                <van-field v-if="showCaptcha" v-model="formData.captcha" center clearable label="验证码" placeholder="请输入验证码">
                    <template #button>
                        <van-button size="small" type="primary" @click="handleGetCaptcha">
                            获取验证码
                        </van-button>
                    </template>
                </van-field>

                <div class="submit-btn">
                    <van-button round block type="primary" native-type="submit">
                        登录
                    </van-button>
                </div>
            </van-form>
        </div>
    </AppPage>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { login, getCaptcha } from './api'
import AppPage from '@/components/h5/AppPage/index.vue'

@Component({
    name: 'Login',
    components: {
        AppPage,
    },
})
export default class Login extends Vue {
    /** 表单数据 */
    private formData = {
        username: '',
        password: '',
        captcha: '',
    }

    /** 是否显示验证码 */
    private showCaptcha = false

    /** 获取验证码 */
    private async handleGetCaptcha() {
        try {
            const res = await getCaptcha()
            if (res.data) {
                this.$toast.success('验证码已发送')
            }
        } catch (error) {
            this.$toast.fail('获取验证码失败')
        }
    }

    /** 提交表单 */
    private async handleSubmit() {
        try {
            const payload: any = {
                username: this.formData.username,
                password: this.formData.password,
            }
            if (this.showCaptcha) {
                payload.captcha = this.formData.captcha
            }
            const res = await login(payload)
            if (res.data) {
                // 存储token和用户信息
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo))
                this.$toast.success('登录成功')
                // 跳转到首页
                this.$router.push('/')
            }
        } catch (error) {
            this.$toast.fail('登录失败')
            // 登录失败显示验证码
            this.showCaptcha = true
        }
    }
}
</script>

<style lang="less" scoped>
.login-page ::v-deep {
    .login-container {
        padding: 20px;

        .login-header {
            text-align: center;
            margin-bottom: 30px;

            h1 {
                font-size: 24px;
                color: #333;
                margin-bottom: 10px;
            }

            p {
                font-size: 14px;
                color: #999;
            }
        }

        .submit-btn {
            margin-top: 20px;
        }

        .van-cell {
            padding: 10px 16px;
        }

        .van-button {
            height: 44px;
            line-height: 44px;
        }
    }
}
</style>
