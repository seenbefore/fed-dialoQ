/**
 * @file API：/form
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from "@/entry/library/scripts/http"

/**
 * 描述：查询表单列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author yangsizhen
 */
export function getFormInfoList(data?: {
/** 分页参数 页码数 */ pageNum?: number, 
/** 分页参数 每页条数 */ length?: number, 
/** 对象排序字段 */ orderField?: string, 
/** 对象排序方式 asc,desc */ orderMethod?: string, 
/** 表单中文名称 */ formName?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<FormDto>>>({
        url: "/form/getFormInfoList",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：根据表单id查询表单信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author yangsizhen
 */
export function getFormInfoById(data?: {
/** 主键 */ id?: number, 
/** 表单英文名称 */ name?: string, 
/** 表单中文名称 */ formName?: string, 
/** 创建人唯一标识 */ creatorId?: string, 
/** 创建人 */ creator?: string, 
/** 表单内容 */ content?: string, 
/** 创建时间 */ createTime?: string, 
/** 更新时间 */ updateTime?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<FormDto>>({
        url: "/form/getFormInfoById",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：根据表单id删除表单信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author yangsizhen
 */
export function deleteFormInfoById(data?: {
/** 主键 */ id?: number, 
/** 表单英文名称 */ name?: string, 
/** 表单中文名称 */ formName?: string, 
/** 创建人唯一标识 */ creatorId?: string, 
/** 创建人 */ creator?: string, 
/** 表单内容 */ content?: string, 
/** 创建时间 */ createTime?: string, 
/** 更新时间 */ updateTime?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1>({
        url: "/form/deleteFormInfoById",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：保存表单信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author yangsizhen
 */
export function saveFormInfo(data?: {
/** 主键 */ id?: number, 
/** 表单英文名称 */ name?: string, 
/** 表单中文名称 */ formName?: string, 
/** 创建人唯一标识 */ creatorId?: string, 
/** 创建人 */ creator?: string, 
/** 表单内容 */ content?: string, 
/** 创建时间 */ createTime?: string, 
/** 更新时间 */ updateTime?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1>({
        url: "/form/saveFormInfo",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：更新表单信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author yangsizhen
 */
export function updateFormInfoById(data?: {
/** 主键 */ id?: number, 
/** 表单英文名称 */ name?: string, 
/** 表单中文名称 */ formName?: string, 
/** 创建人唯一标识 */ creatorId?: string, 
/** 创建人 */ creator?: string, 
/** 表单内容 */ content?: string, 
/** 创建时间 */ createTime?: string, 
/** 更新时间 */ updateTime?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1>({
        url: "/form/updateFormInfoById",
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

export interface PageResponse<T> {

    /**
     * 总记录数
     */
    total: string

    /**
     * 总页数
     */
    pages: number

    /**
     * 返回的分页数据对象
     */
    data: T[]

}

export interface FormDto {

    /**
     * 创建人
     */
    creator: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 表单中文名称
     */
    formName: string

    /**
     * 表单英文名称
     */
    name: string

    /**
     * 创建人唯一标识
     */
    creatorId: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 主键
     */
    id: number

    /**
     * 表单内容
     */
    content: string

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

