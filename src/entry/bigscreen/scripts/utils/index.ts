/**
 * @description 生成随机数
 * @param {number} max 最大值
 * @param {number} decimal 小数位，默认0
 */
export function createRandomNumber(max: number, decimal = 0) {
    const randomVal = Math.random() * max
    if (!decimal) return Math.ceil(randomVal)
    return Math.ceil(randomVal * Math.pow(10, decimal)) / Math.pow(10, decimal)
}
