import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
// 全局处理一些特殊数据
export const exData = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {
        // 支持restful格式的api /news/detail/{id}
        const body = config.params || config.data || config.body || {}
        config.url = config.url?.replace(/\{(.+?)\}/g, ($1: any, key: any) => {
            const result = body[key] || ''
            return result
        })
        // body字段转化
        const method = config.method?.toLowerCase() + ''
        if (config.body) {
            if (['delete', 'get', 'head', 'options'].indexOf(method) > -1) {
                config.params = {
                    ...config.body,
                }
            } else {
                config.data = {
                    ...config.body,
                }
            }
        }
        // 兼容api-server生成的API函数
        if (config.type) {
            let type = config.type.toLowerCase()
            config.method = type
            if (['delete', 'get', 'head', 'options'].includes(type)) {
                config.params = {
                    ...(config.data || {}),
                }
            } else {
                config.data = {
                    ...(config.data || {}),
                }
            }
        }
    },
    onComplete(config: ExAxiosRequestConfig, isResolve: boolean, resOrErr: ExApiResponse) {
        if (isResolve) {
            // 将分页总数转为数字
            // if (Object.prototype.hasOwnProperty.call(resOrErr, 'data')) {
            //     resOrErr.result = resOrErr.data
            // }
            // if (Object.prototype.hasOwnProperty.call(resOrErr, 'total')) {
            //     resOrErr.total = +resOrErr.total
            // }
        }
    },
})

export default exData
