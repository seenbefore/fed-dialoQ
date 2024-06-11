import { cloneDeep } from 'lodash'

export { cloneDeep }
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
 * @description 生成唯一标识
 */
export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
