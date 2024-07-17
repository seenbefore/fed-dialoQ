import * as echarts from 'echarts'

/**
 * @description 设置图表渐变色
 * @param {Array} colors 渐变色色值集合
 */
export const setLinearGradient = (colors: string[]) => {
    const offsets: number[] = [0, 1],
        options: any[] = []
    const len = colors.length
    if (len > 2) {
        const interval: any = (1 / (len - 1)).toFixed(1)
        for (let i = 0; i < len - 2; i++) {
            offsets.splice(offsets.length - 1, 0, (i + 1) * interval)
        }
        // console.log('offsets :>> ', offsets)
    }
    colors.forEach((color: string, index: number) => {
        options.push({ offset: offsets[index], color })
    })
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, options)
}
