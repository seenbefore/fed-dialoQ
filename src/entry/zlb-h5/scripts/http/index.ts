import { createBaseHttp } from '@@core/common/http/baseHttp'
import exAuth from '@zlb-h5/scripts/http/exAuth'
import { ZLBConfig } from '@zlb-h5/share/ZLBConfig'
import { appStore } from '@zlb-h5/store/useStore'

export const http = createBaseHttp({
    exHooks: ['BaseApiHook', exAuth, 'BaseDataHook', 'BaseConsoleHook', 'BaseMobileLoadingHook', 'BaseShowMobileErrorMessageHook'],
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
    },
    getResponseError(res: any) {
        const { message = '网络走神了', code = '-1' } = res
        /* 6001 token 失效 */
        if (code == 6001) {
            appStore.clear()
            if (process.env.VUE_APP_IS_ZLB_DEV_ENV) {
                window.location.reload()
            } else {
                // token 失效的情况下直接跳转到首页
                ZWJSBridge.close().then(() => ZWJSBridge.openLink({ url: ZLBConfig.getHomeUrl }))
            }
        }
        return {
            message,
            code,
        }
    },
})

export default http
