import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result } from '@/@types'

export interface AnalysisVO {
    /** 访问次数 */
    visitCount: number
    /** 独立IP */
    uniqueIp: number
    /** 统计示例 */
    statisticsExample: number
    /** 地区访问数据 */
    regionData: Array<{
        /** 地区名称 */
        name: string
        /** 访问量 */
        value: number
    }>
    /** 终端数据 */
    terminalData: Array<{
        /** 终端名称 */
        name: string
        /** 占比 */
        value: number
    }>
    /** 浏览器数据 */
    browserData: Array<{
        /** 浏览器名称 */
        name: string
        /** 占比 */
        value: number
    }>
    /** 访问时段分析 */
    timeAnalysis: Array<{
        /** 时间 */
        time: string
        /** 访问量 */
        value: number
    }>
}

/**
 * 获取分析页数据
 */
export function getAnalysisData(options?: ExAxiosRequestConfig) {
    return http.request<Result<AnalysisVO>>({
        url: '/workbench/analysis/data',
        method: 'get',
        ...options,
    })
}
