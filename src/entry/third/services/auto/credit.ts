/**
 * @file API：/credit
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 征信报告记录查询 分页，不同角色看得数据范围不一样
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function page(data?: {
params?: {[key: string]: string}, 
/** 分页页码 */ pageNum?: number, 
/** 分页长度 */ length?: number, 
/** 柜员号 */ username?: string, 
/** 柜员姓名 */ realUsername?: string, 
/** 机构号 */ orgCode?: string, 
/** 机构名称 */ orgCodeName?: string, 
/** 客户姓名 */ customerName?: string, 
/** 证件号码 */ cardCode?: string, 
/** 征信类型：1企业 2个人 */ crditType?: number, 
/** 征信获取状态：1 成功 2失败 */ crditStatus?: number, 
/** 征信解析状态：1 成功 2失败 */ crditAnalyzeStatus?: number, 
/** 查询时间 */ queryTimeStart?: string, 
/** 查询时间 */ queryTimeEnd?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<CreditStatisticsInfo>>>({
        url: "/credit/page",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 刷新征信信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function fetch(data?: {
/** 柜员号 */ username?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/credit/fetch",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 征信报告重新解析
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function parse(data?: {
/** 征信报告ID */ creditId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/credit/parse",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 征信信息系统模拟登录 用户边界
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function edit(data?: {
/** 用户ID */ id?: string, 
/** 登录用户名 */ username?: string, 
/** 登录密码 */ password?: string, 
/** 状态：1正常 2禁用 */ status?: number, 
/** 在没有用户或未找到用户的情况下使用该用户：1使用 0不使用 */ defaultUse?: number, 
/** 最新的cookie */ cookies?: string, 
/** 用户账号 */ userAccount?: string, 
guaKaoUserId?: string, 
/** 创建时间 */ createTime?: string, 
/** 更新时间 */ updateTime?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1>({
        url: "/credit/edit",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 获取用户列表信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author weishuqin
 */
export function getListInfo(data?: {
params?: {[key: string]: string}, 
/** 分页页码 */ pageNum?: number, 
/** 分页长度 */ length?: number, 
/** 用户账号 */ userId?: string, 
/** 用户名称 */ userName?: string, 
/** 挂靠人员 */ psersonKey?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<CreditUserVO[]>>({
        url: "/credit/getListInfo",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 判断当前登录用户是否为管理员：1-是；0-不是
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author weishuqin
 */
export function getIsManage(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<number>>({
        url: "/credit/getIsManage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 根据id获取用户信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author weishuqin
 */
export function getCreditUserById(data?: {
/** 征信用户id */ id?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<CreditUserVO>>({
        url: "/credit/getCreditUserById",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 删除用户信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author weishuqin
 */
export function delete_1(data?: {
/** 征信用户id */ id?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/credit/delete",
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

export interface CreditStatisticsInfo {

    /**
     * 文件名
     */
    fileName: string

    /**
     * 证件号码
     */
    cardCode: string

    /**
     * 渠道号
     */
    channalCode: string

    /**
     * 证件类型
     */
    cardType: string

    /**
     * 查询原因
     */
    queryReason: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 征信解析状态：1 成功 2失败
     */
    crditAnalyzeStatus: number

    /**
     * 客户姓名
     */
    customerName: string

    /**
     * 征信报告存储路径
     */
    path: string

    /**
     * 征信获取状态：1 成功 2失败
     */
    crditStatus: number

    /**
     * 机构号
     */
    orgCode: string

    /**
     * 柜员姓名
     */
    realUsername: string

    /**
     * 查询时间
     */
    queryTime: string

    /**
     * 征信类型：1企业 2个人
     */
    crditType: number

    /**
     * 用户ID
     */
    id: string

    /**
     * 机构名称
     */
    orgCodeName: string

    /**
     * 柜员号
     */
    username: string

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

export interface CreditUserVO {

    /**
     * 部门名称
     */
    deptName: string

    /**
     * 用户姓名
     */
    relName: string

    /**
     * 账号密码
     */
    password: string

    /**
     * 挂靠人员字段
     */
    guaKaoUser: string

    /**
     * 挂靠人员id
     */
    guaKaoUserId: string

    /**
     * 用户ID
     */
    id: string

    /**
     * 用户账号
     */
    userCode: string

    /**
     * 部门编号
     */
    deptCode: string

    /**
     * 前置机账号
     */
    username: string

    /**
     * 状态：正常-1；禁用-2
     */
    status: number

}

