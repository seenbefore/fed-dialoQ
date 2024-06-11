/**
 * @file API：/flow/role
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 审批配置角色查询
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function page(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 角色名称 */ roleName?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<SysRole[]>>({
        url: "/flow/role/page",
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

export interface SysRole {

    /**
     * 角色名称
     */
    name: string

    /**
     * 主键
     */
    id: string

    /**
     * 角色描述
     */
    desc: string

}

