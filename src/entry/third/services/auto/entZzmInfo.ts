/**
 * @file API：/entZzmInfo
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 中征码管理-获取企业信息列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author hujianping
 */
export function entInfo(data?: {
/** 企业名称，支持模糊查询 */ entName?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<EntInfo[]>>({
        url: "/entZzmInfo/entInfo",
        type: "post",
        data,
        ...options
    })
}

/**
 * 中征码管理-中征码信息列表分页查询
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author hujianping
 */
export function index(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<EntZzmInfo>>>({
        url: "/entZzmInfo/index",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 中征码管理-获取中征码信息明细
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author hujianping
 */
export function info(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<EntZzmInfo>>({
        url: "/entZzmInfo/info",
        type: "post",
        data,
        ...options
    })
}

/**
 * 中征码管理-编辑中征码信息 (新增、修改)
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author hujianping
 */
export function edit(data?: {
/** 统一信用代码 */ tyxydm: string, 
/** 企业名称 */ entName: string, 
/** 中征码 */ zzm: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1>({
        url: "/entZzmInfo/edit",
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

export interface EntInfo {

    /**
     * 统一信用代码
     */
    tyxydm: string

    /**
     * 企业名称
     */
    entName: string

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

export interface EntZzmInfo {

    /**
     * 操作人姓名
     */
    opRealName: string

    /**
     * 企业名称
     */
    entName: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 操作人柜员号
     */
    opUserName: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 统一信用代码
     */
    tyxydm: string

    /**
     * 中征码
     */
    zzm: string

}

export interface Result_1 {

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

