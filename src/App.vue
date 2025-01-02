<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/store/modules/user'
import SettingsModule from '@/store/modules/settings'
import { useWatermark } from '@/hooks/useWatermark'

const userStore = getModule(UserModule, store)
import { settingsStore } from '@/store/useStore'

interface UserInfo {
    userName: string
    phone: string
    [key: string]: any
}

@Component({
    components: {},
})
export default class App extends Vue {
    private watermarkInstance: ReturnType<typeof useWatermark> | null = null

    async created() {
        // 接收其他应用的消息，如果是退出则主动操作退出
        window.addEventListener('message', e => {
            const data = e.data
            const type = data.type
            if (type === 'logout') {
                console.log('---------logout---------')
                userStore.fedLogOut()
            }
        })
        // 监听iframe行政执法页面发出的postMessage
        window.addEventListener(
            'message',
            e => {
                const { code } = e?.data || {}
                // 403 是没有权限，401是token失效
                if ([403].includes(code)) {
                    this.$router.push(`/403`)
                } else if ([401].includes(code)) {
                    userStore.fedLogOut()
                }
            },
            false,
        )
        // 如果设置了水印，则添加水印
        if (settingsStore.watermark) {
            console.log('初始化水印...')
            const watermarkContent = `测试水印内容`
            this.watermarkInstance = useWatermark({
                content: watermarkContent,
                font: {
                    color: 'rgba(0, 0, 0, 0.12)',
                    fontSize: 16,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                },
                rotate: -30,
                width: 300,
                height: 150,
                gap: [60, 60],
                offset: [0, 0],
                zIndex: 9999,
            })
            // console.log('水印实例：', this.watermarkInstance)
        }
    }

    beforeDestroy() {
        if (this.watermarkInstance) {
            this.watermarkInstance.destroy()
        }
    }
}
</script>
<style lang="less"></style>
