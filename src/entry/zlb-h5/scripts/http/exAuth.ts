// 全局处理数据鉴权
import { ZLBConfig } from '@zlb-h5/share/ZLBConfig'
import { ExAxiosRequestConfig } from 'icinfo-request'
// @ts-ignore
import encryption from '@zlb-h5/scripts/utils/encryption/3des.js'
import { appStore } from '@zlb-h5/store/useStore'

export const exAuth = Object.freeze({
    onBefore(config: any) {
        const token = appStore.token
        config.headers = config.headers || {}
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        /* 是否需要加密自行处理。 */
        // if (config.method.toLowerCase() === 'post' && !config.notEncryption) {
        //     // post 接口 统一加密参数
        //     const { key, iv } = ZLBConfig.encryptConfig
        //     config.data = {
        //         encParamsStr: encryption.encrypt(key, iv, JSON.stringify(config.data)),
        //     }
        // } else if (config.method.toLowerCase() === 'get') {
        //     // get 不加密参数
        // }
        return config
    },
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: any) {
        if (resOrErr && !isResolve) {
            //
        }
    },
})

export default exAuth
