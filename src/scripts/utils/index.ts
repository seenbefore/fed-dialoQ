import _ from 'lodash'
import axios from 'axios'
import stringify from 'qs/lib/stringify'
import { dateFormat, formatSeconds, formatTimeAgo, getCurrentMonthDateRange, getKPIDateRange } from './time'
import { isObject } from './is'
import concurrency from './concurrency'

export { concurrency, dateFormat, formatSeconds, formatTimeAgo, getCurrentMonthDateRange, getKPIDateRange }

/**
 * 判断是否管理员
 * @param {Object} user 用户
 * @return {Boolean}
 */
export function isAdmin(user: any) {
    if (user?.role?.indexOf('admin') > -1) {
        return true
    }
    return false
}
/**
 * 暂停
 * @param {Number} value 毫秒
 * @return {Promise}
 */
export function sleep(value: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(1)
        }, value)
    })
}
/**
 * 复制文字
 * @param {String} value
 * @return {Boolean}
 */
export function clipboard(value: string) {
    let result = false
    if (document.execCommand) {
        const input = document.createElement('input')
        document.body.appendChild(input)
        input.setAttribute('value', value)
        input.select()

        document.execCommand('copy')
        document.body.removeChild(input)

        result = true
    }

    return result
}
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
    }
    return src
}
declare type TargetContext = '_self' | '_blank'
export function openWindow(
    url: string,
    opt?: {
        target?: TargetContext | string
        noopener?: boolean
        noreferrer?: boolean
    },
) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
    const feature: string[] = []

    noopener && feature.push('noopener=yes')
    noreferrer && feature.push('noreferrer=yes')

    window.open(url, target, feature.join(','))
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = ''
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
    }
    parameters = parameters.replace(/&$/, '')
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

/**
 * 将列表转成对象
 * @param {Object[]} list
 * @param {String} [valueKey]
 * @param {String} [labelKey]
 * @return {Object}
 */
export const listToMap = function(list: any, valueKey: string, labelKey: string) {
    valueKey = valueKey || 'value'
    labelKey = labelKey || 'label'
    const map: any = {}
    _.each(list, item => {
        map[item[valueKey]] = item[labelKey]
    })
    return map
}

/**
 * 将对象序列化成参数
 * @param {object} data
 * @param {Parameters<qs.stringify>[1]} [options]
 */
export const qsStringify = function(data: any, options: any) {
    options = { arrayFormat: 'repeat', ...options }
    return stringify(data, options)
}

/**
 * 将对象转成 formData
 * @typedef {string | number | boolean | File | Blob} Val
 * @param {{[key: string]: Val | Val[]}} data
 * @param {'repeat' | 'brackets' | 'indices'} [arrayFormat]
 */
export const toFormData = function(data: any, arrayFormat = 'repeat') {
    if (data instanceof FormData) return data
    const formData = new FormData()
    _.each(data, (val, key) => {
        if (val === undefined) return
        if (Array.isArray(val)) {
            val = val.filter(v => v !== undefined)
            val.forEach((v: any, i: any) => {
                let k = key
                if (arrayFormat === 'brackets') k += '[]'
                else if (arrayFormat === 'indices') k += `[${i}]`
                formData.append(k, v === null ? '' : v)
            })
        } else {
            formData.append(key, val === null ? '' : val)
        }
    })
    return formData
}

export const isNumber = function(value: any) {
    return typeof value === 'number' && !isNaN(value)
}
/**
 * 返回所有父级节点
 * @param {Array} tree
 * @param {Function} func 匹配
 * @param {Array} [path] 存储结果
 * @return {Array}
 */
export const findChildrenByPath = function(tree: any, func: any, path: any = []) {
    if (!tree) return []
    let data: any
    for (data of tree) {
        //这里按照你的需求来存放最后返回的内容吧
        path.push(data)
        if (func(data)) return path
        if (data.children) {
            const findChildren: any = findChildrenByPath(data.children, func, path)
            if (findChildren.length) return findChildren
        }
        path.pop()
    }
    return []
}
/**
 * @description 格式化人民币 eg:10000 => 10,000.00
 * @param {*} money
 */
export function formatMoney(money: any, decimal = 2) {
    if (Number(money) === 0 || Number.isNaN(Number(money))) return '0.00'
    return Number(money)
        .toFixed(decimal)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 判断是否为 axios 取消的请求
 */
export const isCancel = axios.isCancel

// 是否是子应用路径 http开头并且没有external参数
export const isSubAppPath = function(to: string): boolean {
    if (to.indexOf('sub-app') > -1 || (to.indexOf('http') === 0 && to.indexOf('external=') === -1)) {
        return true
    }
    return false
}
// 是否是第三方路径  https://www.baidu.com?external=1
export const isExternalPath = function(to: string): boolean {
    if (to.indexOf('http') === 0 && to.indexOf('external=') !== -1) {
        return true
    }
    return false
}
/**
 * 将字符串转为代写
 * @param {String} [content]
 * @return {Object}
 */
export function pathToName(content: string) {
    return content.replace(/\//g, '_')
}

export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

/** 复制文本  */
export async function copyText(t: string) {
    // 如果当前浏览器版本不兼容navigator.clipboard
    if (!navigator.clipboard) {
        const ele = document.createElement('input')
        ele.value = t
        document.body.appendChild(ele)
        ele.select()
        document.execCommand('copy')
        document.body.removeChild(ele)
        if (!document.execCommand('copy')) {
            throw Error('复制失败')
        }
        return t
    }
    await navigator.clipboard.writeText(t)
    return t
}

/**
 * 去除对象中的空数据（undefined，null，''），直接修改对象本身
 * @param data
 * @param isFilterEmptyStr 是否过滤空字符串 ''
 */
export const filterDirtyData = function(
    data: any = {},
    /* 是否过滤空字符串，只有在查询接口的情况下回过滤掉空字符串 */
    isFilterEmptyStr = false,
) {
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

// 遍历递归处理数据 obj 元数据   map 映射 {status:{newKey:'$status'}}
export const deepMapHandler = function(obj: any = {}, map: any = {}) {
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
export const responseMapHandler = function(data: any = {}, map: any = {}) {
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
                            if (item.value == value) {
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
/**
 * 根据匹配的菜单找到所有父级，数组返回，最后一个为匹配的对象
 * @param tree
 * @param func
 * @param path
 * @returns
 */
export function findParents(tree: any[], func: any, path: any[] = []) {
    if (!tree) return []
    for (const data of tree) {
        //这里按照你的需求来存放最后返回的内容吧
        path.push(data)
        if (func(data)) return path
        if (data.children) {
            const findChildren: any = findParents(data.children, func, path)
            if (findChildren.length) return findChildren
        }
        path.pop()
    }
    return []
}

/**
 * 获取文字的信息
 * @param text
 * @param parent
 */
export const getTextRect = (text: string, parent: HTMLElement = document.body): DOMRect => {
    const div = document.createElement('div')
    div.innerText = text
    Object.assign(div.style, {
        opacity: 0,
        position: 'fixed',
        left: '-100000000px',
    })
    parent.appendChild(div)
    const rect = div.getBoundingClientRect()
    parent.removeChild(div)
    return rect
}
