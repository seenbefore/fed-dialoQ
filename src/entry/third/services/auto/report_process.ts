/**
 * @file API：/report_process
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 报告保存
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author hufei
 */
export function save(data?: {
queryId: number, 
infoId?: number, 
/** 报告编号 */ reportId?: string, 
/** 表单id */ formKey?: string, 
/** 报告内容数据 */ params?: {[key: string]: any}, 
/** 报告类型：1 授信小额，2 授信大额 ，3 授信集团 */ reportType?: string, 
/** 客户内码 */ khnm?: string, 
/** 流程实例id */ processDefinitionKey?: string, 
/** 是否草稿 1：是 0：否 */ draft?: string, 
/** 是否需要审批 1：是 0：否 */ needProcess?: string, 
/** 是否去现场 1：去 2：不去 3：不涉及 */ sfqxc?: string, 
/** 提交方式 pc  电脑端 app 移动端 */ submitType?: string, 
/** 下一节点审批人id */ nextAssigneeId?: string, 
/** 下一节点审批人名称 */ nextAssigneeName?: string, 
/** 授信前置主键 */ rpPrerSchemeId?: string, 
/** 关联集团报告 id 如果关联必传 */ groupReportId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/report_process/save",
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

