import { IModelAttr } from '@/entry/devops/views/utils/generate-code/core/dataStore/AbstractBaseDataStore'
import { set, toPath, get } from 'lodash'

interface IAttributeValue {
    _label: string
    _type: IModelAttr['type'] // 或者 'input' | '其他可能的类型' 如果您的类型是有限的
    /* 默认值 */
    _defaultValue?: (() => any) | any
    /* 选项 */
    _options?: Array<any>
}

export interface IPropertiesDefinition {
    [key: string]: IAttributeValue | IPropertiesDefinition
}

const eachProperties = (item: IPropertiesDefinition, callback: (key: string, item?: Omit<IModelAttr, 'path'>, childrenAttrs?: IPropertiesDefinition) => void) => {
    const keys = Reflect.ownKeys(item),
        length = keys.length
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i] as string
        /* 注意：不解析 label，type 和子属性共存的情况 */
        const { _label, _type, _defaultValue, _options, ...other } = Reflect.get(item, key) as IPropertiesDefinition['string']
        if (_label && _type) {
            callback(key, { label: _label as string, type: _type as string, options: (_options as Array<any>) || [] })
        } else {
            callback(key, void 0, other as IPropertiesDefinition)
        }
    }
}

/**
 * 获取默认值
 * @param properties
 * @param setCondition
 */
export const getDefaultPropertiesValue = (properties: IPropertiesDefinition, setCondition?: (key: string) => boolean): Obj => {
    const result: Obj = {}
    const getAttr = (item: IPropertiesDefinition, path = '') => {
        eachProperties(item, (key, current, childrenAttrs) => {
            const currentDefinition = Reflect.get(item, key)
            const defaultValue = Reflect.get(currentDefinition, '_defaultValue')
            const currentPath = `${path ? `${path}${path.endsWith('.') ? '' : '.'}` : ''}${key}`
            if (childrenAttrs) {
                getAttr(childrenAttrs, currentPath)
            } else {
                const value = typeof defaultValue === 'function' ? defaultValue() : defaultValue ?? (current?.type === 'switch' ? false : '')
                const isSet = typeof setCondition === 'function' ? setCondition(currentPath) : true
                isSet && set(result, toPath(currentPath), value)
            }
        })
    }

    getAttr(properties)
    return result
}

/**
 * 合并默认值
 * @param properties
 * @param defaultProperties
 */
export const assignDefaultProperties = (properties: Obj, defaultProperties: Obj = {}): Obj => {
    const keys = Reflect.ownKeys(properties),
        length = keys.length

    for (let i = 0; i < length; ++i) {
        const key = keys[i] as string,
            value = Reflect.get(properties, key),
            path = toPath(key),
            defaultValue = get(defaultProperties, path)
        if (typeof defaultValue === 'undefined') {
            set(defaultProperties, path, value)
        } else {
            /* xxx: 有默认值的合并规则暂未定 */
        }
    }
    return defaultProperties
}

/**
 * 解析properties
 * @param properties
 */
export const parseProperties = (properties: IPropertiesDefinition): Array<IModelAttr> => {
    const modelAttrs: Array<IModelAttr> = []

    const getAttr = (item: IPropertiesDefinition, path = '') => {
        eachProperties(item, (key, current, childrenAttrs) => {
            const currentPath = `${path ? `${path}${path.endsWith('.') ? '' : '.'}` : ''}${key}`
            if (childrenAttrs) {
                getAttr(childrenAttrs, currentPath)
            } else {
                modelAttrs.push({ ...current!, path: currentPath })
            }
        })
    }

    getAttr(properties)

    return modelAttrs
}
