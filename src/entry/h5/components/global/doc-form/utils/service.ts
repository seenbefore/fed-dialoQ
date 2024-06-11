import { appStore } from '@/entry/h5/store/useStore'
import axios from 'axios'
import { getURLParameters } from 'icinfo-util'
import { get } from 'lodash'
import { Toast } from 'vant'

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
    /**上传 */
    UPLOAD = '15',
    /**责令选择器 */
    ORDER_SELECT = '99',
}

export interface ApiOptions {
    apiFilter: string
    apiUrl: string
    apiMethod: string
    apiHeaders: string
    apiData?: string
    apiUseToken?: string
}

/**
 * 解析api配置
 * @param apiOptions api参数配置
 * @param restParams
 * @param forceParams
 * @param transform
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
        let data = {}
        try {
            if (apiData) data = JSON.parse(apiData)
        } catch (error) {
            Toast((error as any).toString())
            console.log('参数解析错误: ', error)
            reject()
        }
        data = { ...replaceObjectValue(data, restParams) }
        // 解析headers参数
        let headers = {}
        try {
            if (apiHeaders) headers = JSON.parse(apiHeaders)
        } catch (error) {
            Toast((error as any).toString())
            console.log('参数解析错误: ', error)
            reject()
        }
        if (apiUseToken) {
            const token = appStore.token
            ;(headers as any).Authorization = 'Bearer ' + token
        }
        const axiosOptions: Record<string, any> = {
            method,
            url,
            params,
            data,
            headers,
            // baseURL: '/@API_DOC',
        }
        axios(transform(axiosOptions))
            .then((resp: any) => resolve(resp))
            .catch((error: any) => {
                Toast(error.toString())
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
 * @param external
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
        Toast((error as any).toString())
        console.log('过滤器执行错误: ', error)
    }
}

/**
 * 获取配置了api字段的值
 */
export const getApiFieldValue = async (apiOptions: ApiOptions, restParams: Record<string, any> = {}, forceParams: Record<string, any> = {}, transform = (options: Record<string, any>) => options) => {
    let value = ''
    try {
        // let restOptions: Record<string, any> = {}
        // if (apiOptions.apiMethod.toLocaleLowerCase() === 'get') {
        //     restOptions.params = restParams
        // } else {
        //     restOptions.data = restParams
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

/** 文书模板配置的上传接口有问题 所以这里写死一个可以用的 这个数据结构和配置里的保持一直, 只改了apiUrl */
export const newUploadApi = {
    apiUseToken: '0',
    apiMethod: 'POST',
    apiUrl: `${process.env.VUE_APP_BASEURL_API}/common/file/uploadMultipartFile`,
    apiHeaders: '{}',
    apiFilter: '// todo something...\nreturn data.data.ossUrl',
    apiData: '{}',
}
