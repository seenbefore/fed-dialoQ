import { GenerateCodeTypeEnum } from '@/entry/devops/views/utils/generate-code/core/sources/GenerateCodeTypeEnum'
import { get, toPath } from 'lodash'

export const objectToString = (obj: Obj): string => {
    return JSON.stringify(obj)
}

const baseCopyText = (text: string) => {
    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        try {
            document.execCommand('copy') ? resolve(void 0) : reject(new Error('Failed to copy text.'))
        } catch (err) {
            reject(err)
        } finally {
            document.body.removeChild(textarea)
        }
    })
}

export const copyText = async (text: string) => {
    if (!navigator.clipboard) {
        return baseCopyText(text)
    }
    try {
        await navigator.clipboard.writeText(text)
    } catch (err) {
        throw err
    }
}

export const copyCodeByType = (type: GenerateCodeTypeEnum, code: string) => {
    const { parse } = require('@vue/compiler-sfc')
    const { descriptor } = parse(code)
    switch (type) {
        case GenerateCodeTypeEnum.SCRIPT:
            return copyText(descriptor.script.content)
        case GenerateCodeTypeEnum.STYLE:
            return copyText(descriptor.styles.map((m: { content: string }) => m.content).join('\n'))
        case GenerateCodeTypeEnum.TEMPLATE:
            return copyText(descriptor.template.content)
        default:
            throw new Error('代码解析失败')
    }
}

export const EMPTY_FNC = () => void 0

export const attrConvertToString = (attr: Obj, filterKeys: Array<string> = []): string => {
    return Object.keys(attr).reduce((result: string, key: string) => {
        const value = attr[key]
        if (value === '' || filterKeys.includes(key)) {
            return result
        }
        return result + ` ${key}="${value}"`
    }, '')
}

export const baseEachObj = <T extends Obj>(obj: T, callback: (value: T[keyof T], key: keyof T, obj: T, path: Array<string>, parent?: T) => void, path: Array<string> = [], parent?: T): void => {
    const keys = Reflect.ownKeys(obj)
    if (Array.isArray(obj)) {
        keys.pop()
    }
    const length = keys.length
    for (let i = 0; i < length; ++i) {
        const key = keys[i] as string
        const value = Reflect.get(obj, key)
        const newPath = [...path, key]
        callback(value, key, obj, [...newPath], parent)
        if (typeof value === 'object') {
            baseEachObj(value, callback, [...newPath], obj)
        }
    }
}

/* 默认的判空条件 */
const isEmptyFnc = <T extends Obj>(value: T[keyof T], key: keyof T, obj: T) => value === '' || typeof value === 'undefined'

/* 会修改源数据 */
export const deleteEmptyValue = <T extends Obj>(obj: T, userIsEmptyFnc?: (value: T[keyof T], key: keyof T, obj: T, path: Array<string>, parent?: T) => boolean): T => {
    const currentIsEmptyFnc = userIsEmptyFnc || isEmptyFnc

    baseEachObj(obj, (value, key, obj, path, parent) => {
        if (typeof currentIsEmptyFnc === 'function' && currentIsEmptyFnc(value, key, obj, path, parent)) {
            Reflect.deleteProperty(obj, key)
        }
        // delete empty parent
        const parentKey = path.slice(0, -1)
        if (parentKey && parent) {
            for (let i = parentKey.length - 1; i >= 0; --i) {
                const pk = parentKey[i]
                if (Reflect.has(parent, pk)) {
                    const parentValue = get(parent, toPath(pk))
                    if ((Array.isArray(parentValue) && parentValue.length === 0) || (typeof parentValue === 'object' && Reflect.ownKeys(parentValue).length === 0)) {
                        Reflect.deleteProperty(parent, pk)
                    }
                }
            }
        }
    })

    return obj
}

export const deleteEmptyValueByDefaultValue = <T extends Obj>(obj: T, defaultValue: Obj, userIsEmptyFnc?: (value: T[keyof T], key: keyof T, obj: T, path: Array<string>, parent?: T) => boolean): T => {
    deleteEmptyValue(obj, (value, key, obj, path, parent) => {
        if (isEmptyFnc(value, key, obj)) {
            return true
        }
        const defaultValueKey = path.join('.')
        const currentDefaultValue = get(defaultValue, toPath(defaultValueKey))
        if (value === currentDefaultValue) {
            return true
        }
        if (userIsEmptyFnc && typeof userIsEmptyFnc === 'function') {
            return userIsEmptyFnc(value, key, obj, path, parent)
        }
        return false
    })
    return obj
}
