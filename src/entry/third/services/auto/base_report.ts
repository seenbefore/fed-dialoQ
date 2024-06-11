/**
 * @file API：/base_report
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 授信申请列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengjianpeng
 */
export function getList(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 用户信息 */ sysUserDto?: SysUserDto, 
/** 企业名称 */ entName?: string, 
/** 统一代码/注册号 */ unicode?: string, 
/** 客户经理 */ managerName?: string, 
/** 归属机构 */ orgCode?: string, 
/** 提交日期 */ submitDate?: string, 
/** '报告状态: 1-草稿, 2-已提交,3-审批中, 4-审批完成, 5-退回' */ approveStatus?: number, 
/** 报告类型: 1-大额, 2-小额 */ reportType?: number, 
/** 授信类型: 1-单笔, 2-集团 */ creditType?: number, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<RpBaseListVO>>>({
        url: "/base_report/getList",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 新增报告基础数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengjianpeng
 */
export function addReport(data?: {
/** 前置授信id */ prerId: string, 
/** 企业pripid */ pripid: string, 
/** 报告类型: 1-大额, 2-小额 */ reportType: number, 
/** 授信类型: 1-单笔, 2-集团 */ creditType: number, 
/** 用户信息 */ userDto?: SysUserDto, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/base_report/addReport",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 删除或者失效报告基础数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengjianpeng
 */
export function deleteReport(data?: {
/** 状态: 1-删除, 2-失效 */ deleteType: number, 
/** 前置授信id */ prerId: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/base_report/deleteReport",
        type: "POST",
        data,
        ...options
    })
}

export interface SysUserDto {

    userLoginNum: number

    roles: string[]

    password: string

    post: string

    parentCode: string

    identity: string

    roleLev: string

    orgCode: string

    lastModifyPwdTime: string

    id: string

    passwordSalt: string

    email: string

    workStatus: string

    orgName: string

    cernoType: string

    sort: string

    realName: string

    lastLoginTime: string

    cerno: string

    employeeType: string

    createTime: string

    organizationCode: string

    phone: string

    simpleName: string

    roleName: string

    username: string

    status: string

    desc: string

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

export interface RpBaseListVO {

    /**
     * 审批状态 报告状态: 1-草稿, 2-已提交,3-审批中, 4-审批完成, 5-退回
     */
    approveStatus: string

    /**
     * 集团授信报告有效状态:  0-无效,1-有效
     */
    groupValidStatus: string

    /**
     * 归属机构
     */
    orgName: string

    /**
     * 报告编号
     */
    reportId: string

    /**
     * 企业名称
     */
    entName: string

    /**
     * 集团id
     */
    groupId: string

    /**
     * 提交日期
     */
    submitDate: string

    /**
     * 集团授信有效期
     */
    groupValidDate: string

    /**
     * 客户经理
     */
    managerName: string

    /**
     * '授信类型: 1-单笔, 2-集团',
     */
    creditType: string

    /**
     * '报告类型: 1-大额, 2-小额',
     */
    reportType: string

    /**
     * 客户号
     */
    cuidcsid: string

    /**
     * 报告有效状态: 1-有效, 2-失效
     */
    validStatus: string

    /**
     * 统一代码/注册号
     */
    unicode: string

    /**
     * 前置报告id
     */
    prerId: string

}

