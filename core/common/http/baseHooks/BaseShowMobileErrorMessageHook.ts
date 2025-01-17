import { Toast } from 'vant'
import { ExAxiosRequestConfig } from 'icinfo-request'

export const BaseShowMobileErrorMessageHook = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {},
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: any) {
        const message = resOrErr.message || resOrErr.error

        if (!config.exNoErrorMassage && !isResolve) {
            if (message) {
                Toast(message)
            }
        }
    },
})
