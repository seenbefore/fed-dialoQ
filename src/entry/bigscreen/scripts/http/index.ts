import { createAxios, ExApiResponse, ExAxiosInstance } from 'icinfo-request'
import exShowLoading from '@/scripts/http/exShowLoading'
import exShowErrMessage from '@/scripts/http/exShowErrMessage'
import exConsole from '@/scripts/http/exConsole'
import exAuth from './exAuth'
import exData from './exData'
console.log('[当前请求前缀]', process.env.VUE_APP_BASEURL_API)

const http = createAxios(
    {
        // withCredentials: true,
        // crossDomain: true,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        timeout: 60 * 1000, // 默认超时30s
        baseURL: process.env.VUE_APP_BASEURL_API,
        // 业务请求是否成功
        isResponseSuccess(res: ExApiResponse) {
            if (res.code == undefined || res.code === 0 || res.code === 200) {
                return true
            }
            return false
        },
        getResponseSuccess(res: ExApiResponse) {
            return res
        },
        getResponseError(res: any) {
            const { message = '网络走神了', code = '-1' } = res
            return {
                message,
                code,
            }
        },
    },
    (instance: ExAxiosInstance) => {
        instance.exHooks.add(exData)
        instance.exHooks.add(exAuth)
        instance.exHooks.add(exConsole)
        instance.exHooks.add(exShowLoading)
        instance.exHooks.add(exShowErrMessage)
    },
)
export { http }
export default http
