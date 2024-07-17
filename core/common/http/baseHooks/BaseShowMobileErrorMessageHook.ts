import { Toast } from 'vant'

export const BaseShowMobileErrorMessageHook = Object.freeze({
    onBefore(config: any) {},
    onComplete(config: any, isResolve: any, resOrErr: any) {
        const message = resOrErr.message || resOrErr.error

        if (!config.exNoErrorMassage && !isResolve) {
            if (message) {
                Toast(message)
            }
        }
    },
})
