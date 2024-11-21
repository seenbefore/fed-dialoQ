import { Loading } from 'element-ui'
let instance: any = null // 单例模式
let count = 0

export const BaseDesktopLoadingHook = Object.freeze({
    onBefore(config: any) {
        if (config.exShowLoading) {
            if (!instance || instance.visible === false) {
                const options =
                    Object.prototype.toString.call(config.exShowLoadingOption) === '[object Object]'
                        ? config.exShowLoadingOption
                        : {
                              fullscreen: true,
                              lock: true,
                              text: '加载中...',
                          }

                instance = Loading.service(options)
            }
            count++
            config._exShowLoading = true
        }
    },
    onComplete(config: any) {
        // if (config._exShowLoading) {
        //     if (instance) {
        //         count--
        //         if (count <= 0) {
        //             instance.close()
        //             instance = null
        //             count = 0
        //         }
        //     }
        // }
    },
})
