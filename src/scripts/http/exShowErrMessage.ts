import { Message } from 'element-ui'

interface Raw {
    [propName: string]: any
}
const Cache: Raw = {}
export const exShowErrMessage = Object.freeze({
    onBefore(config: any) {},
    onComplete(config: any, isResolve: any, resOrErr: any) {
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

export default exShowErrMessage
