export type TOption = {
    label: string
    value: string | number
    tag?: string
    class?: string
    enum?: string
    [prop: string]: any
}
export type DictItemType = {
    key?: string
    desc?: string
    options: TOption[]
}

type Mutable<T> = {
    readonly [K in keyof T]: Mutable<T[K]>
}

export type DictionaryType<TKey extends string, TValue> = {
    [key in TKey]: TValue
}

/**
 * 字典类
 */
export class Dictionary<TDict extends DictionaryType<string, DictItemType>> {
    private dict: TDict

    constructor(dict: TDict) {
        this.dict = Object.freeze(dict)
        return this
    }
    /**
     * 给定的字典名称和值进行字典匹配，并返回匹配到的标签
     * @param {any} name 字典名称
     * @param {any} val 字典选项值
     * @returns {any} 字典选项标签
     */
    translate<T extends keyof TDict>(name: T, val: any) {
        const options = this.getOptions(name) || []
        let target = options.find((item) => {
            const include =
                typeof item.value === 'number'
                    ? item.value === val
                    : item.value.split(',').includes(val?.toString() ?? '')
            return item.label == val || item.value == val || include
        })
        return target?.label || ''
    }
    /**
     * 获取字典
     * @param {any} name 字典名称
     * @returns {any} 字典
     */
    get<T extends keyof TDict>(name: T) {
        return this.dict[name]
    }
    /**
     * 获取字典的选项列表
     * @param {any} name 字典名称
     * @returns {any} 选项列表
     */
    getOptions<T extends keyof TDict, R = TDict[T]['options']>(name: T): R {
        const target = this.get(name)
        const result = target.options || []

        return result as unknown as R
    }
    /**
     * 获取指定字典名称和值的字典项
     * @param {any} name 字典名称
     * @param {any} val 字典选项值
     * @returns {any} 字典选项
     */
    getOption<
        T extends keyof TDict,
        K extends
            | TDict[T]['options'][number]['value']
            | TDict[T]['options'][number]['enum'],
        R = TDict[T]['options'][number],
    >(name: T, val: K): R {
        const options = this.getOptions(name) || []
        let target = options.find((item) => {
            const include =
                typeof item.value === 'number'
                    ? item.value === val
                    : item.value.split(',').includes(val?.toString() ?? '')
            return item.label == val || item.value == val || include
        })
        return (target || {}) as R
    }
    /**
     * 用于对传入的数据进行字典匹配，并根据匹配结果新增对象和中文值
     * @param {any} row:any={} 数据
     * @param {any} options?:{deep?:boolean;includes?:string[]} 配置
     * @param {boolean} options.deep 是否递归处理
     * @returns {any} {key:'',key$:{label:'',value:'1'},key$$:''}
     */
    format(row: any = {}, options?: { deep?: boolean; includes?: string[] }) {
        const dict = this.dict
        const _dict: any = {}

        // 构建字典项的选项索引
        Object.keys(dict).forEach((_key) => {
            const target = dict[_key]
            const { key = '', options } = target
            let keys = key.split(',')
            keys.push(_key)
            keys = [...new Set(keys)]
            keys.forEach((k) => {
                const result: any = []
                options.forEach((item: TOption) => {
                    let { value } = item
                    if (typeof value === 'string') {
                        const valueArray = value.split(',')
                        valueArray.forEach((val: any) => {
                            result.push([val, item])
                        })
                    } else {
                        result.push([value, item])
                    }
                })
                _dict[k] = new Map(result)
            })
        })

        // 递归遍历对象并进行格式化
        function recursiveFormat(obj: any) {
            Object.keys(obj).forEach((key) => {
                const value = obj[key] || ''

                if (_dict[key]) {
                    const options = _dict[key]
                    const target = options.get(value)

                    if (target) {
                        const label =
                            target.tag !== undefined ? target.tag : target.label
                        obj[`${key}$`] = {
                            label,
                            class: target.class || '',
                            value: target.value,
                            key: target.key || target.value,
                        }
                        obj[`${key}$$`] = label
                    }
                }

                if (options?.deep && typeof value === 'object') {
                    if (Array.isArray(value)) {
                        obj[key] = value.map(recursiveFormat)
                    } else {
                        obj[key] = recursiveFormat(value)
                    }
                }
            })

            return obj
        }

        return recursiveFormat(row)
    }
}
