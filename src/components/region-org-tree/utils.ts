import { Option, OptionFieldNames } from './types'
/**
 * 是否为空值
 * @param {*} value
 * @return {Boolean}
 */
export const isEmpty = (value: any) => {
    return (Array.isArray(value) && value.length === 0) || value === undefined || value === null || value === ''
}

/**
 * 节点去重
 * @param {Option[]} options
 * @return {Option[]}
 */
export const dedupNode = (options: Option[]) => {
    const optionsMap = options.reduce((acc, option) => {
        acc[option.value] = option
        return acc
    }, {} as Record<string, Option>)
    return Object.values(optionsMap)
}

/**
 * 深度遍历树
 * @param {*} tree 树
 * @param {*} callback 回调
 */
export const dfsTree = (tree: any[], callback: (node: any) => void) => {
    if (!Array.isArray(tree)) return
    tree.some(node => {
        dfsTree(node.children, callback)
        return callback(node)
    })
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

/**
 * 获取选项字段
 * @param {OptionFieldNames} fields
 * @return {OptionFieldNames}
 */
export const getOptionFields = (fields?: OptionFieldNames) => {
    return {
        label: 'label',
        value: 'value',
        children: 'children',
        ...(fields || {}),
    }
}

export const delay = (time = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}
