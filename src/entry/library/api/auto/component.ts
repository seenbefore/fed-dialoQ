/**
 * @file API：/component
 */

import http from "@library/scripts/http"
import { ExAxiosRequestConfig } from 'icinfo-request'

/**
 * 组件-分页列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author ZhangXiaoYan
 */
export function list(data?: {
pageNum?: number, 
length?: number, 
orderField?: string, 
orderMethod?: string, 
/** 关键字查询；查询name 和 summary */ keyWord?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<ComponentInfoPage>>>({
        url: "/component/list",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 组件-详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author ZhangXiaoYan
 */
export function detail(data?: {
/** 组件ID */ componentId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ComponentInfoDetail>>({
        url: "/component/detail",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 组件-保存
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author ZhangXiaoYan
 */
export function save(data?: {
/** 主键 */ id?: string, 
/** 创建人 */ createdBy?: string, 
/** 创建时间 */ createdTime?: string, 
/** 更新人 */ updatedBy?: string, 
/** 更新时间 */ updatedTime?: string, 
/** 组件名称 */ name?: string, 
/** 组件英文 */ englishName?: string, 
/** 组件最新版本号 */ lastVersion?: string, 
/** 组件概述 */ summary?: string, 
/** 组件分类-一级 金融、数字政府、可信认证、外部提供 */ typeOne?: string, 
/** 技术领域 */ technologyType?: string, 
/** 业务条线 */ businessLine?: string, 
/** 使用要求 */ useRequirement?: string, 
/** 组件状态 */ status?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1>({
        url: "/component/save",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 组件-一级分类统计信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author ZhangXiaoYan
 */
export function getComponentTypeOneStat(data?: {
/** 关键字查询；查询name 和 summary */ keyWord?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ComponentTypeOneStat[]>>({
        url: "/component/getComponentTypeOneStat",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 获取项目列表.
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author ZhangXiaoYan
 */
export function getProjectList(data?: {
projectName?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ProjectInfo[]>>({
        url: "/component/getProjectList",
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

export interface ComponentInfoPage {

    /**
     * 组件概述
     */
    summary: string

    /**
     * 更新时间
     */
    updatedTime: string

    /**
     * 组件最新版本号
     */
    lastVersion: string

    /**
     * 组件覆盖应用数
     */
    amount: number

    /**
     * 组件分类-一级 中文名
     */
    typeOneName: string

    /**
     * 业务条线中文名
     */
    businessLineName: string

    /**
     * 技术领域 字典 ci_technology_type
     */
    technologyType: string

    /**
     * 组件分类-一级 字典 ci_type_one
     */
    typeOne: string

    /**
     * 使用要求中文名
     */
    useRequirementName: string

    /**
     * 业务条线 字典 ci_business_line
     */
    businessLine: string

    /**
     * 组件名称
     */
    name: string

    /**
     * 组件状态-中文
     */
    statusName: string

    /**
     * 主键
     */
    id: string

    /**
     * 使用要求 字典 ci_use_requirement
     */
    useRequirement: string

    /**
     * 技术领域 中文名
     */
    technologyTypeName: string

    /**
     * 组件状态 字典 ci_status
     */
    status: string

}

export interface ComponentInfoUrlDto {

    /**
     * 更新时间
     */
    updatedTime: string

    /**
     * 链接名称
     */
    urlName: string

    /**
     * 更新人
     */
    updatedBy: string

    /**
     * 组件ID
     */
    componentId: string

    /**
     * 创建人
     */
    createdBy: string

    /**
     * 创建时间
     */
    createdTime: string

    /**
     * 备注信息
     */
    remark: string

    /**
     * 主键
     */
    id: string

    /**
     * 链接地址
     */
    url: string

}

export interface ComponentInfoDetail {

    /**
     * 组件概述
     */
    summary: string

    /**
     * 更新时间
     */
    updatedTime: string

    /**
     * 组件英文
     */
    englishName: string

    /**
     * 组件最新版本号
     */
    lastVersion: string

    /**
     * 更新人
     */
    updatedBy: string

    /**
     * 技术领域
     */
    technologyType: string

    /**
     * 组件分类-一级 金融、数字政府、可信认证、外部提供
     */
    typeOne: string

    /**
     * 创建人
     */
    createdBy: string

    /**
     * 组件的URL相关信息
     */
    componentInfoUrlList: ComponentInfoUrlDto[]

    /**
     * 业务条线
     */
    businessLine: string

    /**
     * 组件名称
     */
    name: string

    /**
     * 创建时间
     */
    createdTime: string

    /**
     * 主键
     */
    id: string

    /**
     * 使用要求
     */
    useRequirement: string

    /**
     * 组件状态
     */
    status: string

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

export interface ComponentTypeOneStat {

    /**
     * 组件一级分类 编码
     */
    typeOne: string

    /**
     * 组件一级分类 中文
     */
    typeOneName: string

    /**
     * 组件数量.
     */
    componentAmount: number

}

export interface ProjectInfo {

    /**
     * 项目名称
     */
    name: string

    /**
     * 项目id
     */
    id: string

}

