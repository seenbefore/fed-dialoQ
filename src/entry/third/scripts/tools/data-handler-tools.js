/** 数据处理工具模块 */
import { getDataType } from './index'

/**
 * 排序函数封装
 * @param {array} list 数据源
 * @param {string} type 排序状态(升序 = 'asc',降序 = 'desc')
 * @param {boolean} isObj 是否是对象数组，默认为false,
 * @param {string} attr 对象数组指定排序的属性，isObj为true时，才传递该参数
 */
export function sortFunc(list, type, isObj, attr) {
    isObj = isObj || false
    let func = function(attr, type) {
        return function(m, n) {
            let a = isObj ? m[attr] : m
            let b = isObj ? n[attr] : n
            return type === 'asc' ? a - b : b - a
        }
    }
    list.sort(func(attr, type))
}

/**
 * 对象结构转数组对象
 * @param {object} source 源对象 例如： {b:1,a:6,c:9}
 * @param {array} strList 字典数组 例如: ['a','b','c']
 * @return [{type:'a',value:6},{type:'b',value:1},{type:'c',value:9}]
 */
export function objConvertArr(source, strList) {
    // TODO: strList 若该数组中有值为null的话，该方法会有问题，后面再优化
    let result = strList.map(val => ({ type: val, value: 0 }))
    Object.keys(source).map(key => {
        // console.log(key, obj[key])
        let currIdx = strList.indexOf(key)
        result[currIdx].value = source[key]
    })
    return result
}

/**
 * 过滤对象中的字段值为空的字段
 */
export function objectFilterNull(data) {
    if (getDataType(data) !== 'object') {
        return Promise.reject('data is not object')
    }
    const result = {}
    Object.entries(data).forEach(v => {
        if (!['', null, undefined].includes(v[1])) {
            result[v[0]] = v[1]
        }
    })
    return result
}
