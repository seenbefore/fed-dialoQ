import { LinkageWatcher } from '../types'

/**
 * 过滤配置项
 * @param {Array} columns
 * @return {*}
 */
export function filterColumns(columns: any[]) {
    return columns.filter(item => {
        if (!item.prop) item.prop = Math.random().toString()
        return !item.ifRender || item.ifRender()
    })
}

/**
 * 深度遍历树
 * @param {*} tree 树
 * @param {*} callback 回调
 */
export const dfsTree = (tree: any[], callback: (node: any) => boolean | void) => {
    if (!Array.isArray(tree)) return
    tree.some(node => {
        dfsTree(node.children, callback)
        return callback(node)
    })
}

/**
 * 广度遍历树
 * @param {*} tree 树
 * @param {*} callback 回调
 * @param {Number} level 层级
 */
export const bfsTree = (tree: any[], callback: (node: any, index: number, level: number) => void, level = 0) => {
    if (!Array.isArray(tree)) return
    const stack: any[] = []
    const flag = tree.some((node, index) => {
        stack.push(...(node.children || []))
        return callback(node, index, level)
    })
    if (stack.length && !flag) {
        bfsTree(stack, callback, level + 1)
    }
}

/**
 * 判断是否是联动监听器类型
 * @param {*} value 值
 * @return {LinkageWatcher}
 */
export function isLinkageWatcher(value: any): value is LinkageWatcher {
    const $value = value as LinkageWatcher
    return $value?.watch !== undefined && $value?.handler !== undefined
}
