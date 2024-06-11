// 全局处理数据鉴权
import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
import { hex_md5 } from '../utils/md5'
import { appStore } from '@/entry/monitor/store/useStore'

export const exAuth = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {
        const timestamp = new Date().valueOf() + ''
        const clientId = appStore.clientId
        const clientSecret = appStore.clientSecret
        config.headers.clientId = clientId
        config.headers.timestamp = timestamp
        config.headers.sign = hex_md5(clientSecret + timestamp)
    },
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: ExApiResponse) {
        if (resOrErr && !isResolve) {
            if (resOrErr.code === 403 || resOrErr.status === 403) {
                location.href = process.env.BASE_URL
            }
        }
    },
})

export default exAuth
