/**
 * @file API：/process
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 查看征信历史记录，并保存html附件-更新当前用户
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getData(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result>({
        url: "/process/getData",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 手动查看征信历史记录-更新全部
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function handeleData(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result>({
        url: "/process/handeleData",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 查询征信最新报告-更新报告
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getNewReport(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result>({
        url: "/process/getNewReport",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 解析企业征信报告
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getFreshReport(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result>({
        url: "/process/getFreshReport",
        type: "GET",
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

export interface Result {

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
    data: any

    /**
     * 错误信息
     */
    errors: ErrorInfo[]

}

