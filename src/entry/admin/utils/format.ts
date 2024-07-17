/**
 * 格式化命令 替换关键字
 * @param str
 * @param options
 * @returns {string}
 * @example formatCommands("npm run build:${fat:123;prd:222}:$target",{"target":"prd"})
 */
export const formatCommands = (str = '', options: any = {}): string => {
    const params = {
        ...options,
        env: options.target || '',
    }

    return str
        .replace(/\$\{(.*?)\}/g, (all, key) => {
            const dataMap: Obj = {}

            const keys = key.split(';')
            keys.forEach((item: any) => {
                let [label = '', value = ''] = item.split(':')
                label = label.trim()
                value = value.trim()
                dataMap[label] = value
            })

            if (dataMap[params['target']] !== undefined) {
                return dataMap[params['target']]
            }
            return params['target'] || all
        })
        .replace(/\$(\w+)/g, (all, key) => {
            // console.log(1, key, params)
            if (key === 'env' && params['env']?.indexOf('fat') > -1) {
                return 'fat'
            }

            if (params[key]) {
                return params[key]
            }

            return all
        })
}
