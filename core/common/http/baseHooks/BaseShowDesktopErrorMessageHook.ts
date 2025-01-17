import { Message } from 'element-ui'
import { ExAxiosRequestConfig } from 'icinfo-request'
interface Raw {
    [propName: string]: any
}
const Cache: Raw = {}
export const BaseShowDesktopErrorMessageHook = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {},
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: any) {
        const message = resOrErr.message || ''

        if (message && !config.exNoErrorMassage && !isResolve) {
            if (!Cache[message]) {
                Cache[message] = 1
                Message.error(message)
                setTimeout(() => {
                    delete Cache[message]
                }, 2000)
            }
        }
    },
})
