export const BaseApiHook = Object.freeze({
    onBefore(config: any) {
        // 支持restful格式的api /news/detail/{id}
        const body = config.params || config.data || config.body || {}
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
        /* 注意：根据实际业务判断，用于判断是否为查询接口 */
        const QUERY_KEYWORDS = ['get', 'query', 'find', 'list', 'select']
        /* 只有查询的时候才需要过滤空字符串，否则不需要 */
        const endStr = config?.url?.split('/')?.pop() ?? ''
        // exFilterEmpty 是否过滤空 http.get('/xx',{exFilterEmpty:true})
        const isFilterEmptyStr = config.exFilterEmpty ?? QUERY_KEYWORDS.some(s => endStr.startsWith(s))

        /* XXX 为了不引入外部的script而重新定义 */
        const filterDirtyData = (
            data: any = {},
            /* 是否过滤空字符串，只有在查询接口的情况下回过滤掉空字符串 */
            isFilterEmptyStr = false,
        ) => {
            Object.keys(data).forEach(key => {
                // 过滤空字符以及undefined
                if (data[key] === undefined || data[key] === null || (isFilterEmptyStr ? data[key] === '' : false)) {
                    delete data[key]
                }
                if (typeof data[key] === 'object' && !data[key]['length']) {
                    filterDirtyData(data[key])
                }
            })
        }

        if (config.params) {
            filterDirtyData(config.params, isFilterEmptyStr)
        }
        if (config.data) {
            filterDirtyData(config.data, isFilterEmptyStr)
        }
    },
    onComplete(config: any, isResolve: any, resOrErr: any) {},
})
