/**
 * @file API：/org
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 根据机构编码作为父节点获取子机构树
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author weishuqin
 */
export function getOrgTree(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<any[]>>({
        url: "/org/getOrgTree",
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

