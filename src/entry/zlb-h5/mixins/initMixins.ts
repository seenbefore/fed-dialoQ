import { ZLBLogin } from '@zlb-h5/share/ZLBLogin'
import { appStore } from '@zlb-h5/store/useStore'
import { mapGetters } from 'vuex'

const ZWJSBridge = window.ZWJSBridge
/* 初始化的mixins，用于做一些前置的处理 */
export const initMixins = {
    computed: {
        ...mapGetters(['appSysInfo', 'token']),
    },
    data() {
        return {
            isInitSuccess: false,
        }
    },
    methods: {
        async init() {
            try {
                console.log('走单点登录之前')
                await ZLBLogin.getInstance().login()
                console.log('单点登录流程走完')
            } catch (e) {
                console.error('页面初始化失败: ', e)
            } finally {
                this.isInitSuccess = true
            }
        },
    },
    async created() {
        appStore.clear()
        /* 只有是浙里办app才会走单点登录 */
        if (process.env.VUE_APP_ZLB_APP === 'true') {
            if (process.env.VUE_APP_IS_ZLB_DEV_ENV) {
                await this.init()
            } else {
                ZWJSBridge.onReady(async () => {
                    /* 设置当前为老年版本还是普通版本 */
                    const { uiStyle } = await ZWJSBridge.getUiStyle()
                    this.$store.commit('app/updateAppSysInfo', { uiStyle })
                    await this.init()
                })
            }
        } else {
            this.isInitSuccess = true
        }
    },
}
