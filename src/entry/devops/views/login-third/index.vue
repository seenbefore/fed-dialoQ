<template>
    <div class="sg-page page-login-third">跳转中...</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import * as API from '@/entry/devops/api/index'
import { LocalMenu } from '../../menus'
import { userStore } from '../../store/useStore'
import { URLJoin } from 'icinfo-util'
@Component({
    name: 'LoginThird',
    components: {},
})
export default class LoginThird extends Vue {
    @Prop({ default: '' }) redirect!: string
    async created() {
        const { data } = await API.BaseService.config()
        const currentUri = window.location.origin + window.location.pathname
        const loginUri = `${data.thirdLoginUrl}?state=${currentUri}`
        const { access_token, user, message } = this.$route.query
        if (!access_token) {
            location.replace(loginUri)
        } else {
            const redirect = userStore.redirect || userStore.defaultPath || '/'
            if (redirect.indexOf('http://') > -1) {
                location.href = URLJoin.apply(null, [redirect, `?token=${access_token}`] as any)
                return
            }
            this.$message.success(message as string)
            userStore.login(access_token as string)
            const { data } = await API.UserService.current()
            // 设置用户信息
            userStore.setUserInfo({
                username: data.username,
                name: data.name,
                role: data.role,
                position: data.position || '',
            })
            userStore.setPermissionMenus(LocalMenu)
            console.log('redirect', redirect)
            this.$router.replace(redirect).catch(err => {
                console.log(err)
            })
        }
    }
    mounted() {}
}
</script>

<style lang="less" scoped></style>
