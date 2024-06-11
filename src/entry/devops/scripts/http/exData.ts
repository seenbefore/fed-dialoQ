import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
// 全局处理一些特殊数据
export const exData = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {
        if (config.url!.indexOf('/mock') > -1) {
            config.baseURL = ''
        }
        // 只针对查询条件进行数据处理
        if (config.data && config.data.conditions) {
            const conditions = config.data.conditions
            Object.keys(conditions).forEach(key => {
                const result = /%(\w+)%/.exec(key)
                const value = conditions[key]
                if (key.indexOf('$') === 0) {
                    delete conditions[key]
                    return
                }
                if (value === '' || value === undefined) {
                    delete conditions[key]
                    return
                }
                if (result && result[1]) {
                    conditions[result[1]] = `%${value}%`
                    delete conditions[key]
                }
            })
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
