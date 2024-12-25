<template>
    <div class="sg-page page-login">
        <div class="login-container">
            <div class="login-form sg-flexbox">
                <div class="login-form-left">
                    <div class="login-form-title" v-text="title"></div>
                    <div class="login-form-cover">
                        <img src="./assets/img/active-bg-fr.png" alt="" width="90%" />
                    </div>
                </div>

                <div class="login-form-right">
                    <div class="login-switch" @click="toQrcodeLogin">
                        <div class="tip_layer">
                            扫码登录
                        </div>
                        <div class="mark_layer"></div>
                    </div>
                    <sg-base-form class="my-login-form" :fields="fields" v-model="View.model" :span="24" ref="form" size="medium" @submit="onSubmit">
                        <div class="header" slot="header">
                            <span>登录</span>
                        </div>

                        <div slot="footer" class="my-login-form-footer">
                            <el-button :loading="View.loading" type="primary" class="my-login-form-submit" size="large" @click="onSubmit">登录</el-button>
                        </div>
                    </sg-base-form>
                </div>
            </div>
        </div>
        <div class="copyright">
            Copyright © 2022 - 浙江汇信科技 版权所有 · 浙ICP备20025217号-1
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LocalMenu } from '@/menus'
import { FormColumn } from '@/sharegood-ui'
import { userStore, settingsStore } from '@/store/useStore'
import { URLJoin } from 'icinfo-util'
import { http } from '@/scripts/http'
import { encrypt } from './helper'

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
                appendSlotRender: h => {
                    return h('div', {}, [
                        h(
                            'el-checkbox',
                            {
                                props: {
                                    value: this.View.alwaysRemember,
                                    trueLabel: 1,
                                    falseLabel: 0,
                                },
                                on: {
                                    change: (value: any) => {
                                        console.log(value)
                                        this.View.alwaysRemember = value
                                        userStore.toggleRemember(value)
                                    },
                                },
                            },
                            '记住我',
                        ),
                    ])
                },
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
            const access_token = await this.login(model)
            this.$message.success('登录成功')
            this.View.loading = false
            let redirect = this.redirect || userStore.redirect || userStore.defaultPath || '/'
            redirect = decodeURIComponent(redirect)
            if (redirect.indexOf('http://') > -1) {
                location.href = URLJoin.apply(null, [redirect, `?token=${access_token}`] as any)
                return
            }
            this.$router.push(redirect).catch(() => {})
        } catch (err) {
            this.View.loading = false
            console.error(err)
        }
    }

    toQrcodeLogin() {
        let BASE_URL = process.env.BASE_URL
        let redirect = encodeURIComponent(`${location.origin}${BASE_URL}login-free`)
        location.href = `https://cangjie.icinfo.cn/login-library?redirect=${redirect}`
    }
    async login(model: any) {
        const { password, username } = model
        const encryptPasswor = await encrypt(password)
        console.log(username, encryptPasswor)
        const { data } = await http.request({
            url: '/usercenter/user/login',
            method: 'post',
            data: {
                username,
                password: encryptPasswor,
            },
        })
        const { user, token } = data
        // TODO send request

        userStore.setPermissionMenus(LocalMenu)
        userStore.login(token)
        userStore.setUserInfo({
            name: user.realName,
            username: data.loginName,
            sex: user.sex,
            role: data.role,
            position: data.position,
        })

        return data.token
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
    position: relative;
    min-height: 100vh;

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
                color: var(--color-primary);
                &::after {
                    background-color: var(--color-primary);
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
            position: relative;

            .login-switch {
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;

                .mark_layer {
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    right: 0;
                    top: 0;
                    background: url('./assets/img/qrcode.jpg') no-repeat center;
                    background-size: 60px 60px;

                    &::before {
                        display: block;
                        content: ' ';
                        z-index: 10;
                        position: absolute;
                        width: 60px;
                        height: 60px;
                        right: 0;
                        top: 0;
                        background: url('./assets/img/layer_mask.png');
                    }
                }
                .tip_layer {
                    width: 90px;
                    height: 30px;
                    position: absolute;
                    right: 60px;
                    top: 10px;
                    background: url('./assets/img/circle_tip_bg.png') no-repeat center;
                    background-size: cover;
                    z-index: 11;
                    display: flex;
                    align-items: center;
                    padding-left: 10px;
                    cursor: pointer;
                }
            }
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
    .copyright {
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        text-align: center;
        color: #666;
        font-size: 14px;
    }
}
</style>
