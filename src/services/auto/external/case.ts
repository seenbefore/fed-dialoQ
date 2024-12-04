/**
 * @file API：/external/case
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 描述：获取案件列表
通过调用外部业务系统接口获取案件列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author zhengqiang
 */
export function list(data?: {
/** 案件名称, 模糊查询 */ caseName?: string, 
/** 承办人ID -- 后端使用 */ handlerId?: string, 
/** 机构编码 -- 后端使用 */ orgCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ExternalCaseVO[]>>({
        url: "/external/case/list",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：获取案件文书及证据目录
通过调用外部业务系统接口获取案件文书及证据目录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author zhengqiang
 */
export function catalogList(data?: {
/** 案件主键，必须 */ caseId: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ExternalCaseCatalogVO[]>>({
        url: "/external/case/catalogList",
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

export interface ExternalCaseVO {

    /**
     * 承办人
     */
    handler: string

    /**
     * 卷宗类型
     */
    volumeType: string

    /**
     * 领域编码
     */
    territoryCode: string

    /**
     * 立案时间
格式：yyyy-MM-dd HH:mm:ss
     */
    filingTime: string

    /**
     * 案发地址
     */
    caseAddress: string

    /**
     * 执法部门
     */
    enforcementDepartment: string

    /**
     * 决定书编号
     */
    decisionNumber: string

    /**
     * 处罚结果
     */
    punishmentResult: string

    /**
     * 结案时间
格式：yyyy-MM-dd HH:mm:ss
     */
    closingTime: string

    /**
     * 创建时间
格式：yyyy-MM-dd HH:mm:ss
     */
    createTime: string

    /**
     * 案件编号
     */
    caseNumber: string

    /**
     * 执法部门编码
     */
    orgCode: string

    /**
     * 主办人id
     */
    mainHandlerId: string

    /**
     * 案件名称
     */
    caseName: string

    /**
     * 协办人id
     */
    assistHandlerId: string

    /**
     * 主键
     */
    id: string

    /**
     * 当事人
     */
    party: string

}

export interface ExternalCaseAttachmentVO {

    /**
     * 附件名称
     */
    attachmentName: string

    /**
     * 附件id
     */
    id: string

    /**
     * 附件地址
     */
    attachmentUrl: string

}

export interface ExternalCaseCatalogVO {

    /**
     * 案件阶段编码
     */
    caseStageCode: string

    /**
     * 附件列表
     */
    attachments: ExternalCaseAttachmentVO[]

    /**
     * 案件阶段名称
     */
    caseStageName: string

    /**
     * 文号
     */
    documentNumber: string

    /**
     * 文书地址
     */
    documentUrl: string

    /**
     * 文书id
     */
    id: string

    /**
     * 文书名称
     */
    documentName: string

    /**
     * 文书种类编码
     */
    documentKindCode: string

}

