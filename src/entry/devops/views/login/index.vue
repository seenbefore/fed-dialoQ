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
                    <div class="sg-pt-5 sg-flexbox justify-between">
                        <a id="step1" href="javascript:void(0)" class="sg-link" @click="toThirdLogin">GitLab授权登录</a>
                        <div>
                            <!-- <span><router-link to="/register" class="sg-link">注册</router-link></span>
                            <span class="sg-ml-2 sg-mr-2">|</span> -->
                            <span><router-link to="/forget-password" class="sg-link">找回账号/密码?</router-link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { LocalMenu } from '@/entry/devops/menus'
import * as API from '@/entry/devops/api/index'
import { FormColumn } from '@/sharegood-ui'
import { userStore, settingsStore } from '@/entry/devops/store/useStore'
import introJs from 'intro.js'
import 'intro.js/introjs.css' // intro.js的基础样式文件
//import 'intro.js/themes/introjs-modern.css'
import { URLJoin } from 'icinfo-util'

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
    guide() {
        const intro = introJs()
        intro.setOptions({
            nextLabel: '下一步', // 下一个的按钮文字
            prevLabel: '上一步', // 上一个按钮文字
            skipLabel: '跳过', // 跳过指引的按钮文字
            doneLabel: '完成', // 完成按钮的文字
            hidePrev: false, // 是否在第一步中隐藏“上一步”按钮;不隐藏，将呈现为一个禁用的按钮
            hideNext: false, // 是否在最后一步中隐藏“下一步”按钮（同时会隐藏完成按钮);不隐藏，将呈现为一个禁用的按钮
            exitOnEsc: false, // 点击键盘的ESC按钮是否退出指引
            exitOnOverlayClick: false, // 点击遮罩层时是否退出介绍
            showStepNumbers: false, // 是否显示步骤编号
            disableInteraction: true, // 是否禁用高亮显示框内元素的交互
            showBullets: true, // 是否显示面板的指示点
            overlayOpacity: 0.7, // 遮罩层的透明度 0-1之间
            helperElementPadding: 10, // 选中的指引元素周围的填充距离
            steps: [
                {
                    element: '#step1', // 定位到相应的元素位置，如果不设置element，则默认展示在屏幕中央
                    title: '引导', // 标题
                    intro: '开发人员请通过gitlab授权登录，或者通过账号密码获取信息', // 内容
                },
            ],
        })
        intro.oncomplete(function() {
            userStore.setLoginGuide()
        })
        if (!userStore.loginGuide) {
            intro.start()
        }
    }
    mounted() {
        if (userStore.alwaysRemember || this.action === 'AutoLogin') {
            this.View.model.username = userStore.username
            this.View.model.password = userStore.password
        }
        if (this.action === 'AutoLogin') {
            this.onSubmit()
        }
        this.$nextTick(() => {
            this.guide()
        })
        //userStore.setRedirect(decodeURIComponent(this.redirect))
        //console.log(11, this.View)
    }
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
    toThirdLogin() {
        userStore.setRedirect(decodeURIComponent(this.redirect))
        this.$router.push('/login-third')
    }
    toQrcodeLogin() {
        let BASE_URL = process.env.BASE_URL
        let redirect = encodeURIComponent(`${location.origin}${BASE_URL}login-free`)
        location.href = `https://cangjie.icinfo.cn/login-library?redirect=${redirect}`
        //this.$message.warning('暂未开放')
    }
    async login(model: State) {
        const { data } = await API.UserService.login(model)
        userStore.setPermissionMenus(LocalMenu)
        userStore.login(data.token)
        userStore.setUserInfo({
            name: data.name,
            username: model.username,
            sex: 1,
            role: data.role,
            position: data.position || '',
        })
        if (this.View.alwaysRemember) {
            userStore.rememberAccount(model)
        }
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
}
</style>
