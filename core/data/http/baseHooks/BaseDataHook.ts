import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
// 全局处理一些特殊数据
export const BaseDataHook = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {},
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: ExApiResponse) {},
})
