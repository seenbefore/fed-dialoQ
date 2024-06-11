/**
 * @file API：/info
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * Description 获取企业详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function entDetail(data?: {
pripid?: string, 
sysUserDto?: any, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<BaseInfoVo>>({
        url: "/info/entDetail",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 获取企业基本信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function baseEntInfo(data?: {
pripid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<EntCusPoolDto>>({
        url: "/info/baseEntInfo",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description 企业信息分页查询
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function page(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<EntInfoVo>>>({
        url: "/info/page",
        type: "POST",
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

export interface BaseInfoVo {

}

export interface EntCusPoolDto {

}

export interface PageResponse<T> {

    /**
     * 过滤后的记录数
     */
    recordsFiltered: string

    /**
     * 请求次数计数器
     */
    draw: number

    /**
     * 返回的分页数据对象
     */
    data: T[]

    /**
     * 错误提示信息
     */
    error: string

    /**
     * 总记录数
     */
    recordsTotal: string

}

export interface EntInfoVo {

}

