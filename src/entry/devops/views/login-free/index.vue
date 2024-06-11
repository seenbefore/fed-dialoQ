<template>
    <div class="sg-page page-login-free">跳转中..</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { userStore } from '../../store/useStore'
import { UserService } from '../../api'
import { getURLParameters } from 'icinfo-util'
import { LocalMenu } from '../../menus'
@Component({
    name: 'LoginFree',
    components: {},
})
export default class LoginFree extends Vue {
    async created() {
        const { token, username, name, phone = '', from = '仓颉', position = '', orgName = '' } = getURLParameters(location.href)
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
            userStore.setPermissionMenus(LocalMenu)
            console.log('登录成功', data)
            setTimeout(() => {
                const path = process.env.NODE_ENV === 'development' ? '/' : '/admin'
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
