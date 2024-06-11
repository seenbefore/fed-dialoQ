<template>
    <div class="sg-page page-login">
        <nav class="navbar"></nav>

        <div class="login-container">
            <div class="login-form sg-flexbox">
                <div class="login-form-left">
                    <div class="login-form-title" v-text="title"></div>
                    <div class="login-form-cover">
                        <img src="./assets/img/active-bg-fr.png" alt="" width="90%" />
                    </div>
                </div>

                <div class="login-form-right">
                    <sg-base-form class="my-login-form" :fields="fields" v-model="View.model" :span="24" ref="form" size="medium" @submit="onSubmit">
                        <div class="header" slot="header">
                            <span>登录</span>
                        </div>

                        <div slot="footer" class="my-login-form-footer">
                            <el-button :loading="View.loading" type="primary" class="my-login-form-submit" size="large" @click="onSubmit">登录</el-button>
                        </div>
                    </sg-base-form>
                    <div class="sg-pt-5 sg-flexbox justify-between">
                        <span>账号密码随意</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LocalMenu } from '@/menus'
import { FormColumn } from '@/sharegood-ui'
import { userStore, settingsStore } from '@/store/useStore'

const state = {
    username: '',
    password: '',
}
type State = typeof state
@Component({
    name: 'LoginSimple',
    components: {},
})
export default class LoginSimple extends Vue {
    @Prop({ default: '' }) redirect!: string
    @Prop({ default: '' }) action!: string
    get title() {
        return settingsStore.title
    }
    mounted() {}
    private View = {
        alwaysRemember: userStore.alwaysRemember,
        loading: false,
        model: {
            ...state,
        },
    }
    private fields: FormColumn[] = [
        {
            tag: 'input',
            name: 'username',
            label: '',
            attrs: {
                placeholder: '请输入账号',
            },
        },
        {
            tag: 'input',
            name: 'password',
            label: '',
            attrs: {
                'show-password': true,
                type: 'password',
                placeholder: '请输入密码',
                isTriggerSubmit: true,
            },
        },
    ]
    get valid() {
        const { username, password } = this.View.model
        if (username && password) {
            return true
        }
        return false
    }
    async onSubmit() {
        try {
            this.View.loading = true
            const model = this.View.model
            await this.login(model)
            this.$message.success('登录成功')
            this.View.loading = false
            const redirect = decodeURIComponent(this.redirect) || userStore.defaultPath || '/'

            this.$router.push(redirect).catch(() => {})
        } catch (err) {
            this.View.loading = false
            console.error(err)
        }
    }
    async login(model: State) {
        // TODO: 登录接口待完善
        // await this.$api.login(model)
        // TODO 开发环境全量加载菜单
        if (process.env.NODE_ENV === 'development') {
            userStore.setPermissionMenus(LocalMenu)
        }

        userStore.login('123456token')
        userStore.setUserInfo({
            name: model.username,
            username: model.username,
        })
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
