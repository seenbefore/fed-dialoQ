/* 将数字转换为px */
export const toPx = (num: number | string): string => {
    if (num === '' || typeof num === 'undefined' || num === null) return num
    if (String(num).endsWith('%')) return String(num)
    const dealWithNum: number = typeof num === 'number' ? num : parseFloat(num)
    if (isNaN(dealWithNum)) return '0px'
    return `${dealWithNum.toFixed(2).replace(/(\.)?0+$/, '')}px`
}
