// 全局处理数据鉴权
import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
import { userStore, appStore } from '../../store/useStore'

export const exAuth = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {
        const token = userStore.token || ''
        config.headers = config.headers || {}
        config.headers['authorization'] = token
        return config
    },
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: ExApiResponse) {
        if (resOrErr && !isResolve) {
            // 用户信息失效
            if (resOrErr.code === 450 || resOrErr.code === 401) {
                userStore.FedLogOut()
            }
        }
    },
})

export default exAuth
