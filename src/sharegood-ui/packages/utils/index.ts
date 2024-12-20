import _ from 'lodash'
export function deepMerge(obj1: any, obj2: any) {
    let key
    for (key in obj2) {
        // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
        obj1[key] = obj1[key] && obj1[key].toString() === '[object Object]' ? deepMerge(obj1[key], obj2[key]) : (obj1[key] = obj2[key])
    }
    return obj1
}

/**
 * @param  {string} key 类数组参数
 * @param  {any} value 需要解构的数组
 * @param  {object} target 将解构的key和value赋给目标数组
 * @desription 根据key解构返回所需的值
 * @example tryDeconstructArray('[start,end]', value: ['2023-1','2023-2'], target: {}) => {start:'2023-1',end:'2023-2'}
 */
export function tryDeconstructArray(key: string, value: any, target: any) {
    const pattern = /^\[(.+)\]$/
    if (pattern.test(key)) {
        const match = key.match(pattern)
        if (match && match[1]) {
            const keys = match[1].split(',')
            value = Array.isArray(value) ? value : [value]

            keys.forEach((k, index) => {
                //console.log(target, k, index, value[index])
                _.set(target, k.trim(), value[index])
            })
            return true
        }
    }
}

/**
 * @param  {string} key 类对象参数 '{name,age}'
 * @param  {any} value 需要解构的值 {name:'张三',sex:1,age:18}
 * @param  {object} target 将解构的key和value赋给目标对象
 * @desription 根据key解构返回所需的值
 * @example tryDeconstructObject('{name,age}', value: {name:'张三',sex:1,age:18}, target: {}) => {name:'张三',age:18}
 */
function tryDeconstructObject(key: string, value: any, target: any) {
    const pattern = /^\{(.+)\}$/
    if (pattern.test(key)) {
        const match = key.match(pattern)
        if (match && match[1]) {
            const keys = match[1].split(',')
            value = isObject(value) ? value : {}
            keys.forEach(k => {
                _.set(target, k.trim(), value[k.trim()])
            })
            return true
        }
    }
}

const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
    return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
    return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
    return !isDef(val)
}

export function isObject(val: any): val is Record<any, any> {
    return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown>(val: T): val is T {
    if (isArray(val) || isString(val)) {
        return val.length === 0
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0
    }

    return false
}

export function isDate(val: unknown): val is Date {
    return is(val, 'Date')
}

export function isNull(val: unknown): val is null {
    return val === null
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
    return isUnDef(val) || isNull(val)
}

export function isNumber(val: unknown): val is number {
    return is(val, 'Number')
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isString(val: unknown): val is string {
    return is(val, 'String')
}

export function isFunction(val: unknown): val is Function {
    return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
    return is(val, 'Boolean')
}

export function isRegExp(val: unknown): val is RegExp {
    return is(val, 'RegExp')
}

export function isArray(val: any): val is Array<any> {
    return val && Array.isArray(val)
}

export function isWindow(val: any): val is Window {
    return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val: unknown): val is Element {
    return isObject(val) && !!val.tagName
}

export function isMap(val: unknown): val is Map<any, any> {
    return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export function isUrl(path: string): boolean {
    const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
    return reg.test(path)
}

export function handleFormValues(values: any) {
    if (!isObject(values)) {
        return {}
    }
    const res = {}
    for (const item of Object.entries(values)) {
        let [, value] = item
        const [key] = item

        // if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        //     continue
        // }
        if (!key || isFunction(value)) {
            continue
        }

        // Remove spaces
        if (isString(value)) {
            value = value.trim()
        }
        if (!tryDeconstructArray(key, value, res) && !tryDeconstructObject(key, value, res)) {
            // 没有解构成功的，按原样赋值
            _.set(res, key, value)
        }
    }
    return res
}

/**
 * 深度遍历树(map)
 * @param {*} tree 树
 * @param {*} callback 回调
 * @return {*}
 */
export const dfsTreeMap = (tree: any[], callback: (node: any) => any) => {
    return tree.map(node => {
        let children: any[] = node.children
        if (Array.isArray(node.children)) {
            children = dfsTreeMap(node.children, callback)
        }
        return callback({ ...node, children })
    })
}
