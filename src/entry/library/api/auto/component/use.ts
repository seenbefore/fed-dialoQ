/**
 * @file API：/component/use
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from "@/entry/library/scripts/http"

/**
 * 组件-应用记录-分页列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author ZhangXiaoYan
 */
export function list(data?: {
pageNum?: number, 
length?: number, 
orderField?: string, 
orderMethod?: string, 
/** 组件id */ componentId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<ComponentUseRecordPage>>>({
        url: "/component/use/list",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 组件-应用记录-保存
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 主键 */ id?: string, 
/** 创建人 */ createdBy?: string, 
/** 创建时间 */ createdTime?: string, 
/** 更新人 */ updatedBy?: string, 
/** 更新时间 */ updatedTime?: string, 
/** 组件id */ componentId?: string, 
/** 项目id */ projectId?: string, 
/** 项目名称 */ projectName?: string, 
/** 应用的组件版本 */ useVersion?: string, 
/** 应用时间 */ useDate?: string, 
/** 是否需要升级 */ isUpgrade?: string, 
/** 技术负责人 */ techPerson?: string, 
/** 技术负责人电话 */ techMobile?: string, 
/** 技术负责人邮箱 */ techMail?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1>({
        url: "/component/use/save",
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

export interface ComponentUseRecordPage {

    /**
     * 组件id
     */
    componentId: string

    /**
     * 应用的组件版本
     */
    useVersion: string

    /**
     * 应用日期
     */
    useDate: string

    /**
     * 技术负责人
     */
    techPerson: string

    /**
     * 主键
     */
    id: string

    /**
     * 是否需要升级
     */
    isUpgrade: string

    /**
     * 项目名称
     */
    projectName: string

    /**
     * 项目id
     */
    projectId: string

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

