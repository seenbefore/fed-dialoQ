// 全局处理数据转化和接口钩子
// import ApiHooks from '../../api-hooks'
//import { filterDirtyData, deepMapHandler } from '@/scripts/utils'
const ApiHooks: any = []
export const exApiHooks = Object.freeze({
    onBefore(config: any) {
        // 支持restful格式的api /news/detail/{id}
        const body = config.params || config.data || config.body || {}
        const uri = config.url
        config.url = config.url.replace(/\{(.+?)\}/g, ($1: any, key: any) => {
            const result = body[key] || ''
            return result
        })
        // body字段转化
        const method = config.method.toLowerCase()
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
            const type = config.type.toLowerCase()
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
        if (config.params) {
            //filterDirtyData(config.params)
        }
        if (config.data) {
            //filterDirtyData(config.data)
        }
        const exApiHooks = config.exApiHooks || []

        if (exApiHooks.length) {
            const ApiHook = ApiHooks.filter((item: any) => exApiHooks.includes(item.name))

            ApiHook.forEach((hook: any) => {
                console.log(`[匹配拦截器: ${hook.description} ${uri} => ${hook.name}]`)
                const params = config.params || config.data || config.body || {}
                const requestMap = hook.requestMap
                if (requestMap) {
                    //deepMapHandler(params, requestMap)
                }
                hook.onBefore && hook.onBefore(params)
            })
        }
    },
    onComplete(config: any, isResolve: any, resOrErr: any) {
        const exApiHooks = config.exApiHooks || []
        if (isResolve && exApiHooks.length) {
            const ApiHook = ApiHooks.filter((item: any) => exApiHooks.includes(item.name))

            ApiHook.forEach((hook: any) => {
                const responseMap = hook.responseMap
                if (responseMap) {
                    //deepMapHandler(resOrErr, responseMap)
                }
                hook.onSuccess && hook.onSuccess(resOrErr)
            })
        }
    },
})

export default exApiHooks
