/**
 * @file API：/cqs
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 征信信息系统模拟登录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function login(data?: {
/** 用户名 */ userName?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result>({
        url: "/cqs/login",
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

