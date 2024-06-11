/**
 * @file API：/sysHoliday
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 根据年份获取节假日列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function index(data?: {
year?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string[]>>({
        url: "/sysHoliday/index/{year}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 节假日设置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
holidayList?: string[], 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/sysHoliday/save",
        type: "PUT",
        data,
        ...options
    })
}

export interface ErrorInfo {

    /**
     * 错误属性
     */
    field: string

    /**
     * 错误信息
     */
    info: string

}

export interface Result<T> {

    /**
     * 返回编码.200=成功
     */
    code: number

    /**
     * 返回信息
     */
    message: string

    /**
     * 返回数据
     */
    data: T

    /**
     * 错误信息
     */
    errors: ErrorInfo[]

}

