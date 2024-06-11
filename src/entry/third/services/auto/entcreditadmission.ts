/**
 * @file API：/entcreditadmission
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 准入分析-分页列表查询-每个角色看的数据范围不一样
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getPage(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 客户号 */ khh?: string, 
/** 是否全部准入类结果(1 是 0 否) */ resultAccess?: number, 
/** 是否有风险禁入类结果(1 是 0 否) */ resultRisk?: number, 
/** 准入分析日期-开始 */ accessDateStart?: string, 
/** 准入分析日期-结束 */ accessDateEnd?: string, 
/** 归属机构,多个逗号分隔 */ orgCode?: string, 
/** 客户名称 */ entname?: string, 
/** 统一社会信用代码 */ unicode?: string, 
/** 当前用户，后台赋值 */ userDto?: SysUserDto, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<EntAdmissionPageVo>>>({
        url: "/ent-credit-admission/getPage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 准入分析风险结果 - 如果列表-是否全部准入类结果为1 不需要调用接口,直接弹窗(准入通过)
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getAdmissionResult(data?: {
/** 准入分析日期 */ analysisDate: string, 
/** 统一社会信用代码 */ unicode: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<EntAdmissionRiskListVo>>({
        url: "/ent-credit-admission/getAdmissionResult",
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

export interface EntAdmissionPageVo {

    /**
     * 归属机构名称
     */
    orgName: string

    /**
     * 授权码归属客户经理编码
     */
    custMgrCode: string

    /**
     * 授权书文件路径
     */
    authFilePath: string

    /**
     * 是否有风险禁入类结果(1 是 0 否)
     */
    resultRisk: number

    /**
     * 授权码归属客户经理名称
     */
    custMgrName: string

    /**
     * 融资金额（万元）
     */
    financeAmt: string

    /**
     * 客户号
     */
    khh: string

    /**
     * 跑批时间
     */
    updateTime: string

    /**
     * 企业唯一标识
     */
    pripid: string

    /**
     * 融资期限：eg 1年内
     */
    financeLimit: string

    /**
     * 准入分析日期
     */
    accessDate: string

    /**
     * 企业名称
     */
    entname: string

    /**
     * 归属机构编码
     */
    orgCode: string

    /**
     * 是否全部准入类结果(1 是 0 否)
     */
    resultAccess: number

    /**
     * 统一社会信用代码
     */
    unicode: string

    /**
     * 自增标识
     */
    id: number

    /**
     * 申请时间
     */
    applyTime: string

}

export interface EntAdmissionRiskItemVo {

    /**
     * 准入指标 等级:A1-禁止,A2-预警
     */
    admissionTarget: string

    /**
     * 类型:A01-企业基本信息, A02-信用状况, A03-经营情况
     */
    type: string

    /**
     * 提示
     */
    notice: string

}

export interface EntAdmissionRiskListVo {

    /**
     * 信用状况
     */
    creditStatusList: EntAdmissionRiskItemVo[]

    /**
     * 经营情况
     */
    performanceCheckList: EntAdmissionRiskItemVo[]

    /**
     * 客户基本信息检查
     */
    baseCheckList: EntAdmissionRiskItemVo[]

}

