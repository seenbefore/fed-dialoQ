import { ExAxiosRequestConfig } from 'icinfo-request'

export const BaseApiHook = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {
        // 如果是FormData类型的数据(通常用于文件上传)，则跳过处理
        if (config.data instanceof FormData) {
            return
        }
        // 支持restful格式的api /news/detail/{id}
        let method = config.type?.toLowerCase() || config.method?.toLowerCase()
        const body = {
            ...(config.data || {}),
            ...(config.params || {}),
            ...(config.body || {}),
        }
        config.method = method
        config.url = config.url.replace(/\{(.+?)\}/g, ($1: any, key: any) => {
            const result = body[key] || ''
            return result
        })

        if (['delete', 'get', 'head', 'options'].indexOf(method) > -1) {
            config.params = {
                ...body,
            }
        } else {
            config.data = {
                ...body,
            }
        }

        // exFilterEmpty 是否过滤空 http.get('/xx',{exFilterEmpty:true})
        // const isFilterEmptyStr = config.exFilterEmpty

        // /* XXX 为了不引入外部的script而重新定义 */
        // const filterDirtyData = (
        //     data: any = {},
        //     /* 是否过滤空字符串，只有在查询接口的情况下回过滤掉空字符串 */
        //     isFilterEmptyStr = false,
        // ) => {
        //     Object.keys(data).forEach(key => {
        //         // 过滤空字符以及undefined
        //         if (data[key] === undefined || data[key] === null || (isFilterEmptyStr ? data[key] === '' : false)) {
        //             delete data[key]
        //         }
        //         if (typeof data[key] === 'object' && !data[key]['length']) {
        //             filterDirtyData(data[key])
        //         }
        //     })
        // }

        // if (config.params) {
        //     filterDirtyData(config.params, isFilterEmptyStr)
        // }
        // if (config.data) {
        //     filterDirtyData(config.data, isFilterEmptyStr)
        // }
    },
    onComplete(config: any, isResolve: any, resOrErr: any) {},
})
