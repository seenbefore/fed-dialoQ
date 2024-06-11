import { Toast } from 'vant'
let instance: any = null // 单例模式
let count = 0

/**
 * @type {import('axios').AxiosInstance['exHooks'][0]}
 */
export const exShowLoading = Object.freeze({
    onBefore(config: any) {
        if (config.exShowLoading) {
            // // @H5.vant
            if (!instance || instance.value === false) {
                instance = Toast.loading({})
            }
            count++
            config._exShowLoading = true
        }
    },
    onComplete(config: any) {
        if (config._exShowLoading) {
            if (instance) {
                count--
                if (count <= 0) {
                    instance.close()
                    instance = null
                    count = 0
                }
            }
        }
    },
})

export default exShowLoading
