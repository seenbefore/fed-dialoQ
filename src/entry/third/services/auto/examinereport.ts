/**
 * @file API：/examinereport
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 审查审批报告分页列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function pagelist(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<ExamineApproveReportPageVo>>>({
        url: "/examine-report/page-list",
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

export interface ExamineApproveReportPageVo {

    /**
     * 归属机构名称
     */
    orgName: string

    /**
     * 审批报告id
     */
    reportId: string

    /**
     * 企业名称
     */
    entName: string

    /**
     * 客户号
     */
    khh: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 授权码归属客户经理
     */
    managerId: string

    /**
     * 授权码归属客户经理姓名
     */
    managerName: string

    /**
     * 更新人
     */
    upadateUser: string

    /**
     * 报告配置页面queryId
     */
    queryId: string

    /**
     * 报告类型
     */
    reportType: string

    /**
     * 审批提交时间
     */
    submitTime: string

    /**
     * 审批对应报告id
     */
    relateReportId: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 归属机构
     */
    orgCode: string

    /**
     * 企业统一社会信用代码
     */
    unicode: string

    /**
     * 创建人
     */
    createUser: string

    /**
     * 主键
     */
    id: number

    /**
     * 审批状态
     */
    examineState: string

}

