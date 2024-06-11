// 全局处理数据鉴权
import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'

export const exAuth = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {},
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: ExApiResponse) {
        if (resOrErr && !isResolve) {
        }
    },
})

export default exAuth
