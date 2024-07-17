<template>
    <div v-if="isInitSuccess" id="app" :class="module === 'elder' ? 'app-var__elder' : 'app-var__normal'">
        <keep-alive :include="include" :exclude="exclude">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <btn-vconsole />
    </div>
</template>

<script>
import { initMixins } from '@zlb-h5/mixins/initMixins'
import { ZLBConfig } from '@zlb-h5/share/ZLBConfig'
import { appStore, logStore } from '@zlb-h5/store/useStore'
import { useConsole } from '@@core/common/hooks/useConsole'

export default {
    mixins: [initMixins],
    created() {
        const { init } = useConsole()
        init()
    },
    data() {
        return {}
    },
    computed: {
        include: () => appStore.include,
        exclude: () => appStore.exclude,
        module: () => appStore.appSysInfo.uiStyle,
    },
    components: {
        BtnVconsole: () => import('@zlb-h5/components/BtnVconsole.vue'),
    },
    methods: {
        init() {
            /** 埋点需要计算用户在页面停留时间  所以需要在每次router更新后  将上一个页面的日志埋点 */
            this.$nextTick(() => {
                try {
                    const zwLog = new ZwLog({
                        _user_id: appStore.appUserInfo.appUserId,
                        _user_nick: appStore.appUserInfo.appUserName,
                    })
                    // onReady 表示 zwlog 加载完成后的函数，它接收一个匿名函数，而 sendPV 与 record 方法均要在匿名函数内调用。
                    zwLog.onReady(() => {
                        zwLog.sendPV({
                            miniAppName: ZLBConfig.appName,
                            miniAppId: ZLBConfig.miniAppId, // 'IRS 服务侧应用 appid
                            Page_duration: logStore.standingTime, // 页面启动到加载完成的时间
                            t2: logStore.oldLoadingTime, // 页面启动到页面响应完成的时间
                            t0: logStore.oldResponseTime,
                            log_status: appStore.appUserInfo.appUserId ? '02' : '01', //  '用户登录状态 （01:未登录/ 02:已登录）'
                            pageId: logStore.pageRoute?.meta?.pageId ?? '',
                            pageName: logStore.pageRoute?.meta?.title ?? '',
                            _user_id: appStore.appUserInfo.appUserId,
                        })
                    })
                } catch (error) {
                    console.error('埋点失败：', error)
                }
            })
        },
    },
    beforeUpdate() {
        /* 只有浙里办程序才需要埋点 */
        if (process.env.VUE_APP_ZLB_APP === 'true') {
            this.init()
        }
    },
}
</script>

<style lang="less">
@import './assets/less/reset.less';
</style>
