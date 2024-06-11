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
                    <sg-base-form v-bind="getFormAttrs" v-model="formModel" ref="form" @submit="onSubmit">
                        <div class="header" slot="header">
                            <span>登录</span>
                        </div>

                        <div slot="footer" class="my-login-form-footer">
                            <el-button :loading="getFormAttrs.loading" :disabled="!valid" type="primary" class="my-login-form-submit" size="large" @click="onSubmit">登录</el-button>
                        </div>
                    </sg-base-form>
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
import { sleep } from '@/scripts/utils'
import { KEYUTIL, KJUR, hextob64 } from 'jsrsasign'
/**
 * 密码加密
 */
function encodePassword(val: string) {
    const pk = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1DbQU2aDBcvDP0ojbOh
B+E2xsKOPCg0KurSfb3hKQMjQ6HKSlcYmIImHguMemYbi9bEVBYfgb8Fqsv4ua7+
SKgcfwlPRpcGqTs5vhL4hjXN5YIZ2JHElLOXVNpW9szdmXrDYc4A4M/d4BKfbnD3
mJKxeX9c1IDmXksPGNUDX/jLvwc7iJcSg0hLqObzj6mY6W80g5UvvtOeEJuU9x7a
gShMfI9JJL7hY81ciVXZ8RRVEdMlAQ9+5s4lWMRMCKModVFqwg0yG3qeJSAqq0gX
OTFqbdrpJ8SzwQvLLd9gtviamDDyexprvb1L8JYT724Q5KIJm6vxhTI78zKFVajz
hQIDAQAB
-----END PUBLIC KEY-----`

    const publicKey = KEYUTIL.getKey(pk)
    // 生成密文
    const enc = KJUR.crypto.Cipher.encrypt(val, publicKey)
    const result = hextob64(enc)

    return result
}
@Component({
    name: 'LoginSimple',
    components: {},
})
export default class LoginSimple extends Vue {
    @Prop() redirect!: string
    get title() {
        return settingsStore.title
    }

    formModel = {
        username: 'admin',
        password: '123456',
    }
    getFormAttrs = {
        class: 'my-login-form',
        loading: false,
        span: 24,
        fields: [
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
        ] as FormColumn[],
    }

    get valid() {
        const { username, password } = this.formModel
        if (username && password) {
            return true
        }
        return false
    }
    async onSubmit() {
        try {
            this.getFormAttrs.loading = true
            const { username, password } = this.formModel
            const payload = {
                username,
                password: encodePassword(password),
            }
            await this.login(payload)
            this.$message.success('登录成功')
            this.getFormAttrs.loading = false
            // url上有redirect则进行重定向
            if (this.redirect) {
                this.$router.push(this.redirect).catch(() => {})
                return
            }
            this.$router.push('/').catch(() => {})
        } catch (err) {
            this.getFormAttrs.loading = false
            console.error(err)
        }
    }
    async login(payload: any) {
        // todo 这里请求接口
        await sleep(200)
        // todo 这里请求接口
        userStore.setUserInfo({
            name: payload.username,
            sex: 2,
        })
        // todo 这里处理下菜单 转换成 LocalMenu 的格式
        userStore.setPermissionMenus(LocalMenu)
        // todo 设置token
        userStore.login('token123')
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
}
</style>
