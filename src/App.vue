<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'
import userModule from '@/store/modules/user'
const userStore = getModule(userModule, store)
@Component({
    components: {},
})
export default class App extends Vue {
    async created() {
        // 接收其他应用的消息，如果是退出则主动操作退出
        window.addEventListener('message', e => {
            const data = e.data
            const type = data.type
            if (type === 'logout') {
                console.log('---------logout---------')
                userStore.FedLogOut({
                    // 广播让其他页面退出
                    broadcast: false,
                    code: 401,
                })
            }
        })
        // 监听iframe行政执法页面发出的postMessage
        window.addEventListener(
            'message',
            e => {
                const { code, message } = e?.data
                // 403 是没有权限，401是token失效
                if ([403].includes(code)) {
                    this.$router.push(`/403`)
                } else if ([401].includes(code)) {
                    userStore.FedLogOut({
                        // 广播让其他页面退出
                        broadcast: true,
                        code: 401,
                    })
                }
            },
            false,
        )
    }
}
</script>
<style lang="less"></style>
