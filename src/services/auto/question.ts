/**
 * @file API：/question
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 问题录入表 分页列表数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author yangsizhen
 */
export function getQuestionList(data?: {
/** 分页参数 页码数 */ pageNum?: number, 
/** 分页参数 每页条数 */ length?: number, 
/** 对象排序字段 */ orderField?: string, 
/** 对象排序方式 asc,desc */ orderMethod?: string, 
/** 查询关键字 */ keyword?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<QuestionDto>>>({
        url: "/question/getQuestionList",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 问题录入表 新增数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author framework-generator
 */
export function add(data?: {
/** id */ id: number, 
/** 问题 */ question?: string, 
/** 问题描述 */ questionDescription?: string, 
/** 创建时间 */ createTime?: string, 
/** 最后一次修改时间 */ updateTime?: string, 
/** 是否删除 0：否 1：是 */ deleted?: string, 
/** 问题步骤 */ questionStepDtoList?: QuestionStepDto[], 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/question/add",
        type: "POST",
        contentType: "application/json",
        data,
        ...options
    })
}

/**
 * 问题录入表 逻辑删除数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author framework-generator
 */
export function del(data?: {
/** 唯一id */ id: number, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/question/del",
        type: "DELETE",
        data,
        ...options
    })
}

/**
 * 问题录入 更新数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuyongfei
 */
export function update(data?: {
/** id */ id: number, 
/** 问题 */ question?: string, 
/** 问题描述 */ questionDescription?: string, 
/** 创建时间 */ createTime?: string, 
/** 最后一次修改时间 */ updateTime?: string, 
/** 是否删除 0：否 1：是 */ deleted?: string, 
/** 问题步骤 */ questionStepDtoList?: QuestionStepDto[], 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/question/update",
        type: "POST",
        contentType: "application/json",
        data,
        ...options
    })
}

/**
 * 问题详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author yangsizhen
 */
export function getQuestionDetail(data?: {
/** 唯一id */ id: number, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<QuestionDetailDto>>({
        url: "/question/getQuestionDetail",
        type: "POST",
        contentType: "application/json",
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

export interface InterfaceAndMarkDto {

    /**
     * 接口标识
     */
    apiMark: string

    /**
     * 接口id
     */
    apiId: string

}

export interface QuestionStepDto {

    /**
     * 问题id
     */
    questionId: number

    /**
     * 是否删除 0：否 1：是
     */
    deleted: string

    /**
     * 内容分析
     */
    contentAnalysis: string

    /**
     * 步骤名称
     */
    stepName: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 步骤描述
     */
    stepDescription: string

    /**
     * 最后一次修改时间
     */
    updateTime: string

    /**
     * id
     */
    id: number

    /**
     * 请求的接口id（保存更新时数据格式为 接口标识英文/apiId）
     */
    stepApiId: string

    /**
     * 排序
     */
    sort: number

    /**
     * 接口及标识集合
     */
    interfaceAndMarkList: InterfaceAndMarkDto[]

    /**
     * 联系人
     */
    contacts: string

}

export interface QuestionDto {

    /**
     * 问题描述
     */
    questionDescription: string

    /**
     * 是否删除 0：否 1：是
     */
    deleted: string

    /**
     * 问题
     */
    question: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 最后一次修改时间
     */
    updateTime: string

    /**
     * id
     */
    id: number

    /**
     * 问题步骤
     */
    questionStepDtoList: QuestionStepDto[]

}

export interface QuestionDetailDto {

    /**
     * 问题描述
     */
    questionDescription: string

    /**
     * 步骤集合
     */
    questionStepDtoList: QuestionStepDto[]

    /**
     * 问题名称
     */
    question: string

}

