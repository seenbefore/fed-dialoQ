import { createAxios, ExApiResponse, ExAxiosInstance } from 'icinfo-request'
import exShowLoading from './exShowLoading'
import exShowErrMessage from './exShowErrMessage'
import exConsole from '@/scripts/http/exConsole'

function initHttp(baseURL?: string) {
    return createAxios(
        {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8',
                //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            timeout: 30 * 1000, // 默认超时30s
            baseURL: baseURL,
            // 业务请求是否成功
            isResponseSuccess(res: ExApiResponse) {
                if (res.code === 0 || res.code === 200) {
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
            instance.exHooks.add(exConsole)
            instance.exHooks.add(exShowLoading)
            instance.exHooks.add(exShowErrMessage)
        },
    )
}

const http = initHttp(process.env.VUE_APP_BASEURL_API)

export default http
