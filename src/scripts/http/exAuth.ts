// 全局处理数据鉴权
import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
import { userStore } from '@/store/useStore'
import { MessageBox } from 'element-ui'
import defaultSettings from '../../settings'
const { settings } = defaultSettings
let isLock = false
export const exAuth = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {
        const token = userStore.token
        config.headers = config.headers || {}
        if (token) {
            config.headers[settings.TokenName] = `Bearer ${token}`
        }

        return config
    },
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: ExApiResponse) {
        if (resOrErr && !isResolve) {
            const message = resOrErr.message || ''
            // 401 用户信息失效 403 无权限 450 无效token
            if ([401, 403, 450].includes(resOrErr.code)) {
                // 2秒内只提示一次
                if (!isLock) {
                    MessageBox({
                        title: '提示',
                        message: `用户登录异常 [code:${resOrErr.code}], 是否立即退出重新登录？`,
                    }).then(() => {
                        userStore.fedLogOut()
                    })
                    isLock = true
                    setTimeout(() => {
                        isLock = false
                    }, 2000)
                }
            }
        }
    },
})

export default exAuth
