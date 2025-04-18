// 全局处理数据鉴权
import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
import { userStore } from '../../store/useStore'

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
            if (resOrErr.code === 450) {
                userStore.fedLogOut()
            }
        }
    },
})

export default exAuth
