// 全局处理数据鉴权
import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
import { userStore } from '../../store/useStore'
import defaultSettings from '../../settings'
const { settings } = defaultSettings
export const exAuth = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {
        const token = userStore.token || ''
        config.headers = config.headers || {}
        config.headers[settings.TokenName] = token
        // config.headers['hnxw_ssid'] = '2bbe9725-0233-42f9-98c6-67194f2d5651'
        return config
    },
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: ExApiResponse) {
        if (resOrErr && !isResolve) {
            const { code, status } = resOrErr

            // 用户信息失效
            // if (resOrErr.code === 450) {
            //     userStore.FedLogOut()
            // }
            /* 登录超时 */
            if (status === 401) {
                /* 告知服务端重定向到登录页 */
                // window.parent.postMessage(
                //     {
                //         type: 'loginTimeout',
                //         pagePath: '/',
                //         originPath: location.pathname,
                //     },
                //     '*',
                // )
                // /* 延时覆盖旧页面 */
                // if (process.env.VUE_APP_ENV !== 'dev') {
                //     setTimeout(() => {
                //         window.location.replace(process.env.VUE_APP_BASEURL_LOGIN_API)
                //     }, 2500)
                // }
            }
        }
    },
})

export default exAuth
