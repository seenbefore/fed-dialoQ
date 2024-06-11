/**
 * @file API：/approveprivilege
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 获取审批配置列表
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
/** 柜员姓名 */ userName?: string, 
/** 柜员号 */ userNo?: string, 
/** 开始时间 */ startTime?: string, 
/** 结束时间 */ endTime?: string, 
/** 归属机构 */ orgCode?: string, 
/** 额度配置状态 0 未配置  1有效  2失效 */ configurationStatus?: number, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<ApprovePrivilegeVO>>>({
        url: "/approve-privilege/getList",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 获取用户配置信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengjianpeng
 */
export function getUserInfo(data?: {
/** 用户id */ userId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<ApprovePrilegeInfoVO>>({
        url: "/approve-privilege/getUserInfo",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 获取产品明细信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengjianpeng
 */
export function getCreditPlanInfo(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<CreditPlanVO[]>>({
        url: "/approve-privilege/getCreditPlanInfo",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 配置个人审批额度
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengjianpeng
 */
export function updateUserApproveQuota(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 用户id */ userId?: string, 
/** 权限开始日期 */ privilegeStartTime?: string, 
/** 权限结束日期 */ privilegeEndTime?: string, 
/** 权限额度列表 */ quotaList?: CreditPlanQuotaVO[], 
/** 操作人 */ operateUser?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/approve-privilege/updateUserApproveQuota",
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

export interface ApprovePrivilegeVO {

    /**
     * 是否配置授信审批额度 1是 0否
     */
    sxStatus: number

    /**
     * 归属机构
     */
    orgName: string

    /**
     * 额度配置状态 0 未配置  1有效  2失效
     */
    configurationStatus: number

    /**
     * 柜员号
     */
    userNo: string

    /**
     * 操作人
     */
    operateUser: string

    /**
     * 权限开始日期
     */
    startTime: string

    /**
     * 最近操作时间
     */
    updateTime: string

    /**
     * 权限结束日期
     */
    endTime: string

    /**
     * 柜员姓名
     */
    userName: string

    /**
     * 用户id
     */
    userId: string

    /**
     * 是否配置用信审批额度 1是 0否
     */
    yxStatus: number

}

export interface CreditPlanQuotaVO {

    /**
     * 审批类别，1:授信 2：用信
     */
    approveType: number

    /**
     * 质押
     */
    hypothecatedQuota: string

    /**
     * 等级
     */
    level: number

    /**
     * 保证
     */
    ensureQuota: string

    /**
     * 默认false  前端使用
     */
    editStatus: string

    /**
     * 抵押
     */
    guarantyQuota: string

    /**
     * 父节点
     */
    parentNode: string

    /**
     * 业务类别编码
     */
    businessTypeCode: string

    /**
     * 授信额度
     */
    sxQuota: string

    /**
     * 保证金
     */
    earnestMoney: string

    /**
     * 业务类别名称
     */
    businessTypeName: string

    /**
     * 信用
     */
    creditQuota: string

    /**
     * 用信额度
     */
    yxQuota: string

    /**
     * 下一层级数据
     */
    childrenList: CreditPlanQuotaVO[]

}

export interface UserInfoVO {

    /**
     * 归属机构
     */
    orgName: string

    /**
     * 归属机构
     */
    orgCode: string

    /**
     * 柜员号
     */
    userNo: string

    /**
     * 权限开始日期
     */
    startTime: string

    /**
     * 权限结束日期
     */
    endTime: string

    /**
     * 柜员姓名
     */
    userName: string

    /**
     * 用户id
     */
    userId: string

}

export interface ApprovePrilegeInfoVO {

    /**
     * 用信权限额度列表
     */
    yxQuotaList: CreditPlanQuotaVO[]

    /**
     * 用户信息
     */
    userInfo: UserInfoVO

    /**
     * 权限开始日期
     */
    startTime: string

    /**
     * 权限结束日期
     */
    endTime: string

    /**
     * 授信权限额度列表
     */
    sxQuotaList: CreditPlanQuotaVO[]

}

export interface CreditPlanVO {

    /**
     * 父节点
     */
    parentNode: string

    /**
     * 业务类别编码
     */
    businessTypeCode: string

    /**
     * 下一层级数据
     */
    childrenList: CreditPlanVO[]

    /**
     * 业务类别名称
     */
    businessTypeName: string

    /**
     * 等级
     */
    level: string

}

