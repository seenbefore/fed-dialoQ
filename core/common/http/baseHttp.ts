import { defineHooks, IDefineHooks } from './defineHooks'
import { createAxios, ExApiResponse, ExAxiosInstance, ExAxiosRequestConfig, ExHook } from 'icinfo-request'
import { assignIn, isFunction, isString } from 'lodash'

export interface IConfig extends ExAxiosRequestConfig {
    exHooks?: Array<ExHook | IDefineHooks>
}

export type ICallBack = (instance: ExAxiosInstance) => any

export const getBaseConfig = (): IConfig => {
    return {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        timeout: 60 * 1000, // 默认超时30s
        baseURL: process.env.VUE_APP_BASEURL_API,
        // 业务请求是否成功
        isResponseSuccess(res: ExApiResponse) {
            return res.code == undefined || res.code === 0 || res.code === 200
        },
        getResponseSuccess(res: ExApiResponse) {
            return res
        },
        getResponseError(res: any) {
            const { message = '网络走神了', code = '-1' } = res
            return {
                message,
                code,
            }
        },
    }
}

/* 创建一个http，有三个重载。 */
export function createBaseHttp(config?: IConfig): ExAxiosInstance
export function createBaseHttp(callback: ICallBack): ExAxiosInstance
export function createBaseHttp(config: IConfig, callback: ICallBack): ExAxiosInstance
export function createBaseHttp(configOrCallBack?: IConfig | ICallBack, callback?: ICallBack): ExAxiosInstance {
    const baseConfig = getBaseConfig()
    /* 合并基础配置 */
    const config = isFunction(configOrCallBack) ? baseConfig : assignIn(baseConfig, configOrCallBack)
    const emptyFnc = () => {}
    const axiosCallBack = isFunction(configOrCallBack) ? configOrCallBack : callback ?? emptyFnc
    const { exHooks, ...resetConfig } = config
    return createAxios(
        {
            ...resetConfig,
        },
        (instance: ExAxiosInstance) => {
            /* 添加hooks */
            exHooks?.length &&
                exHooks.forEach(hook => {
                    if (isString(hook)) {
                        const currentHook = Reflect.get(defineHooks, hook)
                        if (!currentHook) {
                            console.warn(`未找到${hook}对应的hook，请检查core/common/http/defineHooks.ts`)
                        } else {
                            instance.exHooks.add(currentHook)
                        }
                    } else {
                        instance.exHooks.add(hook)
                    }
                })
            axiosCallBack?.(instance)
        },
    )
}
