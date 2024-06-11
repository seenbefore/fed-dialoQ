import { isObject } from 'lodash'

/* 用于更新某个对象的部分字段 */
export const updatePartialKey = <T extends Obj>(data: T, value: Partial<T>, callBack?: (key: string) => boolean): void => {
    if (value && isObject(value)) {
        Object.keys(value).forEach(key => {
            if (!callBack?.(key)) {
                Reflect.has(data, key) && Reflect.set(data, key, Reflect.get(value, key))
            }
        })
    }
}

/* 给对象的值修改默认展示的值 - */
export const setDefaultShowValue = <T extends Obj>(data: T, callBack?: (key: string, value: any) => boolean): T => {
    const keys = Object.keys(data),
        length = keys.length
    for (let i = 0; i < length; ++i) {
        const key = keys[i]
        const value = Reflect.get(data, key)
        if (!callBack?.(key, value)) {
            !key && Reflect.set(data, key, value ?? '-')
        }
    }
    return data
}
