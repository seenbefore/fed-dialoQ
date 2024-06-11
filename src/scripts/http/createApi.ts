import { ExAxiosInstance, ExApiHook, ExApi } from 'icinfo-request'

// 遍历递归处理数据 obj 元数据   map 映射 {status:{newKey:'$status'}}
function deepMapHandler(obj: any = {}, map: any = {}) {
    // 判断原目标是数组还是对象，进行初始化赋值
    const newObj: any = obj.constructor === Array ? [] : {}
    responseMapHandler(obj, map)
    // 循环原目标
    for (const key in obj) {
        // 判断当前值是否存在
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // 判断是否当前要拷贝的是否是对象
            if (obj[key] && typeof obj[key] === 'object') {
                // 是对象，再次调用deepClone递归
                newObj[key] = deepMapHandler(obj[key], map)
            } else {
                // 数组，直接赋值就好
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}
function responseMapHandler(data: any = {}, map: any = {}) {
    Object.keys(map).forEach(key => {
        const target = map[key]
        const value = data[key]
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (typeof target === 'string') {
                data[target] = value
            } else if (typeof target === 'object') {
                const { newKey = `$${key}`, handler, replace, dict } = target

                try {
                    let newValue = value
                    // 字典枚举查询
                    if (dict) {
                        let _dict: any = {}
                        if (typeof dict === 'function') {
                            _dict = dict()
                        }
                        const options = _dict.options || []

                        options.forEach((item: any) => {
                            if (item.value === value) {
                                newValue = item.label
                            }
                        })
                    }
                    if (handler) {
                        newValue = handler(value, data)
                    }

                    data[newKey] = newValue

                    if (replace) {
                        delete data[key]
                    }
                } catch (err) {
                    console.error(err)
                }
            } else if (typeof target === 'function') {
                const result = target(value, data)
                if (result !== undefined) {
                    data[key] = result
                }
            }
        }
    })
}
// 返回api服务
export function createAPI(http: ExAxiosInstance, apis: Array<ExApiHook>): ExApi {
    const interceptorsMAP: any = {}
    apis.forEach((item: any) => {
        let { name, method, url } = item
        name = name || url
        const key = name + method
        if (interceptorsMAP[key]) {
            console.error(`[createAPI error]: 出现重复拦截器 ${name} ${method}`, item)
        } else {
            interceptorsMAP[key] = 1
        }
    })
    const methods = ['dispatch']
    const API: any = {}
    methods.forEach((key: string) => {
        API[key] = function(...arg: any[]) {
            const method = key
            const name = arg[0]
            const params = arg[1]
            const config = arg[2]
            const api = apis.filter((item: any) => {
                if (key === 'dispatch') {
                    return item.name === name
                }
                return item.name === name && item.method === method
            })[0]
            if (!api) {
                throw Error(`API 不存在 ${name}`)
            }
            const callback = function() {
                const config$ = api.config || {}
                const uri = config$.url || name
                const description = api.description || ''
                const method = config$.method || api.method || 'get'
                const responseMap = api.responseMap
                const requestMap = api.requestMap

                const options = {
                    method,
                    url: uri,
                    body: params,
                    description,
                    ...config$,
                    ...config,
                }
                try {
                    if (requestMap) {
                        deepMapHandler(params, requestMap)
                    }
                    api.onBefore!(params)
                } catch (err) {
                    console.error(err)
                }
                // console.log('url', uri, options)
                return http.request(options).then((data: any) => {
                    // let { data = {} } = res

                    if (responseMap) {
                        deepMapHandler(data, responseMap)
                    }
                    try {
                        const result = api.onSuccess!(data)
                        if (result) {
                            return result
                        }
                        return data
                    } catch (err) {
                        console.error(err)
                        return err
                    }
                })
            }
            return callback()
        }
    })

    return API
}
