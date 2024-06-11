<template>
    <div class="sg-page page-login-free">跳转中..</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { userStore } from '../../store/useStore'
import { UserService } from '../../services/user'
import { getURLParameters } from 'icinfo-util'
@Component({
    name: 'LoginFree',
    components: {},
})
export default class LoginFree extends Vue {
    async created() {
        let { token, username, name, phone = '', from = '仓颉', position = '', orgName = '', redirect = '' } = getURLParameters(location.href)
        redirect = decodeURIComponent(redirect)
        if (redirect && redirect.indexOf('login-free') > -1) {
            location.replace(location.href.replace(`http://192.168.1.147:3001/fed-library/login-free`, redirect))
            return
        }
        if (token && username && name) {
            const { data } = await UserService.autoLogin({
                username: decodeURIComponent(username),
                name: decodeURIComponent(name),
                position: decodeURIComponent(position),
                orgName: decodeURIComponent(orgName),
                phone,
                from,
            })
            const token = data.token
            userStore.login(token + '')

            userStore.setUserInfo({
                name: data.name,
                username: data.username,
                phone: data.phone,
                role: data.role,
                position: data.position,
                orgName: data.orgName,
            })
            console.log('登录成功', data)
            setTimeout(() => {
                const path = process.env.NODE_ENV === 'development' ? '/' : '/fed-library'
                location.replace(location.origin + path)
            }, 0)
            return
        } else {
            this.$message.warning(`参数缺失：请检查 username or name`)
        }
    }
}
</script>

<style lang="less" scoped></style>
