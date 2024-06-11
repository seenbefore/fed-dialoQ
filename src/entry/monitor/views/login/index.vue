<template>
    <div class="sg-page page-login">
        <nav class="navbar"></nav>

        <div class="login-container">
            <div class="login-form sg-flexbox">
                <div class="login-form-left">
                    <div class="login-form-title"></div>
                    <div class="login-form-cover">
                        <img src="./assets/img/active-bg-fr.png" alt="" width="90%" />
                    </div>
                </div>

                <div class="login-form-right">
                    <sg-base-form class="my-login-form" v-if="fields.length" :fields="fields" v-model="View.model" :span="24" ref="form" size="medium" @submit="onSubmit">
                        <div class="header" slot="header">
                            <span>前端埋点监控平台</span>
                        </div>

                        <div slot="footer" class="my-login-form-footer">
                            <el-button :loading="View.loading" type="primary" class="my-login-form-submit" size="large" @click="onSubmit" :disabled="!valid">登录</el-button>
                        </div>
                    </sg-base-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { FormColumn } from '@/sharegood-ui'
import { appStore } from '@/entry/monitor/store/useStore'

const state = {
    clientSecret: '',
    clientId: '',
    clientName: '',
}
type State = typeof state
@Component({
    name: 'LoginSimple',
    components: {},
})
export default class LoginSimple extends Vue {
    isProd = process.env.VUE_APP_ENV === 'prod'
    app = {} as State
    @Prop({ default: '' }) redirect!: string
    @Prop({ default: '' }) action!: string

    mounted() {
        // 清空鉴权信息
        appStore.setAuthInfo({})
        if (this.isProd) {
            let app = appStore.apps.filter(item => location.origin.indexOf(item.host) > -1)[0] || {}
            this.app = app
            this.View.model.clientName = app.clientName
        } else {
            this.app = {
                clientId: 'mOqTFNCurU',
                clientSecret: 'NIH5xdcOBUP5RORZnKcyhBLZ',
                clientName: '',
            }
        }
    }
    private View = {
        loading: false,
        model: {
            ...state,
        },
    }
    get fields() {
        return [
            {
                tag: 'select',
                name: 'clientName',
                label: '',
                attrs: {
                    options: () => {
                        return appStore.apps.map(item => {
                            return { label: item.clientName, value: item.clientName }
                        })
                    },
                    disabled: this.isProd,
                },
            },
            {
                tag: 'input',
                name: 'clientSecret',
                label: '',
                attrs: {
                    'show-password': true,
                    type: 'password',
                    placeholder: '请输入密码',
                    isTriggerSubmit: true,
                },
            },
        ] as FormColumn[]
    }
    get valid() {
        const { clientSecret, clientName } = this.View.model
        if (clientSecret) {
            return true
        }
        return false
    }
    async onSubmit() {
        try {
            const { clientSecret } = this.app
            const model = this.View.model
            if (clientSecret !== model.clientSecret) {
                this.$message.error('密码错误')
                throw new Error('密码错误')
            }
            await this.login(model)
            this.$message.success('登录成功')

            this.$router.push('/dashboard')
        } catch (err) {
            console.error(err)
        }
    }
    async login(model: State) {
        appStore.setAuthInfo({
            ...this.app,
            clientName: model.clientName,
        })
        document.title = model.clientName
    }
}
</script>

<style>
.Login {
    background-color: #dce9f5;
}
</style>
<style lang="less" scoped>
.page-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 450px;
    height: 100%;
    .login-type-bar {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
        border-bottom: 1px solid #ddd;
        .login-type-item {
            position: relative;
            padding: 0 8px;
            height: 45px;
            line-height: 45px;
            cursor: pointer;

            &::after {
                position: absolute;
                bottom: -1px;
                left: 0;
                display: block;
                width: 100%;
                height: 2px;
                background-color: transparent;
                content: ' ';
            }
            &.active {
                color: var(--system-primary-color);
                &::after {
                    background-color: var(--system-primary-color);
                }
            }
        }
    }
    .my-icon-box {
        display: inline-block;
        padding-right: 10px;
        padding-left: 7px;

        height: 100%;
        ::after {
            position: absolute;
            top: 20%;
            right: 0;
            display: block;
            width: 1px;
            height: 60%;
            border-right: 1px solid #ddd;
            content: ' ';
        }
    }
    .my-login-form-footer {
        padding-top: 5px;
    }
    .navbar {
        display: none;
        min-height: 50px;
        // margin-bottom: 20px;
    }
    .login-container {
        margin: 0 auto;
        width: 800px;
    }
    .login-form {
        background-color: #fff;
        .login-form-left {
            width: 55%;
            height: 450px;
            background: url('./assets/img/active-bg.png') no-repeat center center;
            background-size: cover;
            color: #fff;

            .login-form-title {
                padding-top: 50px;
                text-align: center;
                font-weight: bold;
                font-size: 24px;
            }
            .login-form-cover {
                padding-top: 40px;
                text-align: center;
            }
        }
        .login-form-right {
            flex: 1;
            padding: 30px;
            padding-top: 50px;
        }
        .my-login-form {
            padding: 0;
            .header {
                padding-top: 50px;
                margin-bottom: 30px;
                font-weight: bold;
                font-size: 24px;
            }
            .my-form-item-code {
                display: flex;

                .my-code {
                    margin-left: 10px;
                }
            }
            .my-login-form-submit {
                width: 100%;
                border-radius: 26px;
            }
            .el-input--prefix .el-input__inner {
                padding-left: 45px;
            }
        }
    }
    ::v-deep {
        .password {
            .sg-data-form-field {
                display: block;
            }
            .suffix {
                display: block;
                margin-top: 12px;
                text-align: right;
            }
        }
    }
}
</style>
