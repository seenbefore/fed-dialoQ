import exAuth from '@zlb-h5/scripts/http/exAuth'
import exShowErrMessage from '@zlb-h5/scripts/http/exShowErrMessage'
import exShowLoading from '@zlb-h5/scripts/http/exShowLoading'
import { ZLBConfig } from '@zlb-h5/share/ZLBConfig'
import { appStore } from '@zlb-h5/store/useStore'
import exApiHooks from '@/scripts/http/exApiHooks'
import exConsole from '@/scripts/http/exConsole'
import exData from '@/scripts/http/exData'
import { createAxios, ExApiResponse, ExAxiosInstance } from 'icinfo-request'
import { Dialog } from 'vant'

function initHttp(baseURL?: string) {
    return createAxios(
        {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            timeout: 30 * 1000, // 默认超时30s
            baseURL: baseURL,
            // 业务请求是否成功
            isResponseSuccess(res: ExApiResponse) {
                if (res.code === 0 || res.code === 200) {
                    return true
                } else {
                    return false
                }
            },
            getResponseSuccess(res: ExApiResponse) {
                return res
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
        },
        (instance: ExAxiosInstance) => {
            /* 如果想要通过config.methods获取请求类型，这个需要放在第一位 */
            instance.exHooks.add(exApiHooks)
            instance.exHooks.add(exAuth)
            instance.exHooks.add(exData)
            instance.exHooks.add(exConsole)
            instance.exHooks.add(exShowLoading)
            instance.exHooks.add(exShowErrMessage)
        },
    )
}

export const http = initHttp(process.env.VUE_APP_BASEURL_API)

export default http
