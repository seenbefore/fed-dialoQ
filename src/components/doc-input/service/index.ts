import store from '@/store'
import { getURLParameters, get } from 'icinfo-util'
import { Message } from 'element-ui'
import axios from 'axios'

/**控件类型枚举 */
export enum CONTROL_TYPE {
    /**文本 */
    TEXT = '0',
    /**输入框 */
    INPUT = '1',
    /**数字框 */
    NUMBER_INPUT = '2',
    /**日期时间 */
    DATETIME = '3',
    /**签字签章 */
    SING = '4',
    /**签名 */
    HANDWRITTEN_SIGN = '5',
    /**复选框 */
    CHECKBOX = '8',
    /**选择框 */
    SELECT = '9',
    /**表格 */
    TABLE = '10',
    /**级联选择 */
    CASCADER = '11',
    /**图片 */
    IMAGE = '12',
    /**地图选址 */
    MAP_ADDRESS = '13',
    /**循环模板 */
    CYCLE = '14',
    /**上传 */
    UPLOAD = '15',
}

/**
 * 判断值是否为空
 * @param value
 */
export const isEmpty = (value: any) => {
    if (value === undefined || value === null || value === '') {
        return true
    } else if (Array.isArray(value)) {
        if (value.length === 0) {
            return true
        }
        return value.every(isEmptyItem)
    } else if (Object.prototype.toString.call(value) === '[object Object]' && Object.keys(value).length === 0) {
        return true
    }
    return false
}

/**是否是空项 */
export const isEmptyItem = (value: any): boolean => {
    if (value === '' || value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
        return true
    }
    if (Object.prototype.toString.call(value) === '[object Object]') {
        const values = Object.values(value)
        if (values.length === 0) return true
        return values.every(item => {
            return isEmptyItem(item)
        })
    }
    return false
}

/**API配置项数据结构 */
export interface ApiOptions {
    /**过滤器 */
    apiFilter: string
    /**请求地址 */
    apiUrl: string
    /**请求方式 */
    apiMethod: string
    /**请求头参数 */
    apiHeaders: string
    /**post请求参数 */
    apiData?: string
    /**是否使用token */
    apiUseToken?: string
}
/**
 * 解析api配置
 * @param apiOptions api参数配置
 * @param restParams 额外参数集合
 * @param forceParams 强制注入的参数集合
 * @returns
 */
export const parseApiOptions = (apiOptions: ApiOptions, restParams: any = {}, forceParams: Record<string, any> = {}, transform = (options: Record<string, any>) => options) => {
    return new Promise((resolve, reject) => {
        const { apiMethod: method, apiUrl, apiData, apiHeaders, apiUseToken } = apiOptions
        // 解析url
        const [url] = apiUrl.split('?')
        // 解析params参数
        const params = {
            ...replaceObjectValue(getURLParameters(apiUrl), restParams),
            ...forceParams,
        }
        // 解析data参数
        let data: Record<string, any> = {}
        try {
            if (apiData) data = JSON.parse(apiData)
        } catch (error) {
            Message.error((error as any).toString())
            console.log('参数解析错误: ', error)
            reject()
        }
        data = { ...replaceObjectValue(data, restParams), ...forceParams }
        // 解析headers参数
        let headers = {}
        try {
            if (apiHeaders) headers = JSON.parse(apiHeaders)
        } catch (error) {
            Message.error((error as any).toString())
            console.log('参数解析错误: ', error)
            reject()
        }
        if (apiUseToken) {
            const token = store.state.user.token
            ;(headers as any).Authorization = 'Bearer ' + token
        }
        // const reg = new RegExp(/(\w+):\/\/([^/:]+)(:\d*)?/)
        const axiosOptions: Record<string, any> = {
            method,
            // url: url.replace(reg, ''),
            url,
            params,
            data,
            headers,
            // baseURL: '/@API_DOC_o',
        }
        axios(transform(axiosOptions))
            .then(resp => resolve(resp))
            .catch(error => {
                Message.error((error as any).toString())
                reject(error)
            })
    })
}
/**
 * 替换对象里的值
 */
export const replaceObjectValue = (params: any = {}, restParams: Record<string, any> = {}, symbol = '$') => {
    // 判断传入值，是否是对象
    if (params === null || typeof params !== 'object') {
        if (params?.toString().charAt(0) === symbol) {
            const field = params.slice(1)
            return get(restParams, field)
        }
        return params
    }
    // 通过new obj.constructor()巧妙的避免了对当前数据是数组还是真对象的判断
    const $params = new params.constructor()
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            const _obj = params[key]
            if (!_obj && Reflect.has(restParams, key)) {
                Reflect.set($params, key, Reflect.get(restParams, key))
            } else {
                $params[key] = replaceObjectValue(_obj, restParams, symbol) //递归复制
            }
        }
    }
    return $params
}
/**
 * 执行过滤器
 * @param funcStr 过滤器函数字符串
 * @param params
 * @returns
 */
export const callFilter = (funcStr = '', params: any, external: Record<string, any> = {}) => {
    const str = `
    "use strict";
    var document;
    ${funcStr}
`
    const filter = new Function('data', 'external', str)
    try {
        return filter.call({}, params, external)
    } catch (error) {
        Message.error((error as any).toString())
        console.log('过滤器执行错误: ', error)
    }
}

/**
 * 获取配置了api字段的值
 * @param apiOptions api配置
 * @param restParams 额外参数集合
 * @param forceParams 强制注入的参数集合
 * @returns
 */
export const getApiFieldValue = async (apiOptions: ApiOptions, restParams: Record<string, any> = {}, forceParams: Record<string, any> = {}, transform = (options: Record<string, any>) => options) => {
    let value = ''
    try {
        // let restOptions: Record<string, any> = {}
        // if (apiOptions.apiMethod.toLocaleLowerCase() === 'get') {
        //     restOptions.params = forceParams
        // } else {
        //     restOptions.data = forceParams
        // }
        const { data }: any = await parseApiOptions(apiOptions, restParams, forceParams, transform)
        value = await callFilter(apiOptions.apiFilter, data, restParams)
    } catch (error) {
        console.log(error)
    }
    return value
}
/**解析函字符串函数 */
export const parseStringFunction = (str: string) => {
    if (str) {
        try {
            const func = new Function(`return ${str}`)
            return func()
        } catch (error) {
            console.log('解析字符串函数失败: ', error)
        }
    }
    return false
}

/**
 * 解析json
 * @param json
 * @param defaultValue
 * @returns
 */
export const parseJson = (json: string, defaultValue: any): any => {
    if (!json) return defaultValue
    try {
        return JSON.parse(json)
    } catch (error) {
        console.log('json解析错误', error)
        return defaultValue
    }
}
