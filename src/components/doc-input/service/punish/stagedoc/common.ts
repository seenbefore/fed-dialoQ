/**
 * @file API：/punish/stagedoc/common
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '@/scripts/http'

/**
 * 【V1.0.0】描述：保存文书信息通用接口
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xiangyuyu
 */
export function saveDocInfo(
    data?: {
        /** 案件id */ caseId: string
        /** 文书目录编码 */ documentCatalogCode: string
        /** 文书内容数据map */ dataMap: any
        /** 是否更新关联表;1 需要更新 ，0 无需更新 */ isUpdateRelationTable?: string
        /** 案件关闭信号 */ closeSignal?: string
        /** 文书状态 */ documentApprovalStatus?: string
        /** 所属文书id */ belongDocumentId?: string
        /** 是否获取空白文书(0-否/1-是) */ isGetBlankDoc?: string
        /** 是否一个案件id与文书目录编码对应多个文书记录（0-否/1-是） */ isMultipleDoc?: string
        /** 当事人id */ partyId?: string
        /** 文书种类编码 */ documentKindCode?: string
        /** 附件信息列表 */ appendixList?: AppendixDto[]
        /** 文书模板类型 1:标准2：窄幅（不传默认为标准） */ documentTemplateType?: string
        /** 文书模板类型 1:标准2：窄幅（不传默认为标准） */ documentTemplateCode?: string
        /** 案件副（子）流程id */ caseAssistId?: string
        /** 区分浙里办送达参数 */ zlbCaseDocumentRecordDto?: zlbCaseDocumentRecordDto
        /** 是否修改文书；1 是 ，0否 */ isEditFile?: string
        /** 文书id */ docId?: string
        /** 关联操作补正更正文书的id */ relationDocumentId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<{ [key: string]: any }>>({
        url: '/punish/stagedoc/common/saveDocInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 案件补录-撤销决定-保存文书信息接口
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xiangyuyu
 */
export function saveDocInfoAdditional(
    data?: {
        /** 案件id */ caseId: string
        /** 文书目录编码 */ documentCatalogCode: string
        /** 文书内容数据map */ dataMap: any
        /** 是否更新关联表;1 需要更新 ，0 无需更新 */ isUpdateRelationTable?: string
        /** 案件关闭信号 */ closeSignal?: string
        /** 文书状态 */ documentApprovalStatus?: string
        /** 所属文书id */ belongDocumentId?: string
        /** 是否获取空白文书(0-否/1-是) */ isGetBlankDoc?: string
        /** 是否一个案件id与文书目录编码对应多个文书记录（0-否/1-是） */ isMultipleDoc?: string
        /** 当事人id */ partyId?: string
        /** 文书种类编码 */ documentKindCode?: string
        /** 附件信息列表 */ appendixList?: AppendixDto[]
        /** 文书模板类型 1:标准2：窄幅（不传默认为标准） */ documentTemplateType?: string
        /** 文书模板类型 1:标准2：窄幅（不传默认为标准） */ documentTemplateCode?: string
        /** 案件副（子）流程id */ caseAssistId?: string
        /** 区分浙里办送达参数 */ zlbCaseDocumentRecordDto?: zlbCaseDocumentRecordDto
        /** 是否修改文书；1 是 ，0否 */ isEditFile?: string
        /** 文书id */ docId?: string
        /** 关联操作补正更正文书的id */ relationDocumentId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<{ [key: string]: any }>>({
        url: '/punish/stagedoc/common/saveDocInfoAdditional',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 描述：保存补正/更正文书信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function saveCorrectionDocInfo(
    data?: {
        /** 案件id */ caseId?: string
        /** 关联文书的文书记录表ID */ relationDocumentRecordId?: string
        /** 审批表参数 */ correctionApproveDoc?: CorrectionDocSaveDetailDto
        /** 通知书参数 */ correctionDoc?: CorrectionDocSaveDetailDto
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<CorrectionDocSaveVo>>({
        url: '/punish/stagedoc/common/saveCorrectionDocInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 描述：保存补正/更正送达文书信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function saveCorrectionConfirmSend(
    data?: {
        /** 案件id */ caseId?: string
        /** 关联文书的文书记录表ID */ relationDocumentRecordId?: string
        /** 文书记录表ID */ documentRecordId?: string
        /** 文书目录编码 */ documentCatalogCode?: string
        /** 文书内容数据map */ dataMap?: any
        /** 当事人id */ partyId?: string
        /** 文书模板类型 1:标准2：窄幅（不传默认为标准） */ documentTemplateType?: string
        /** 补正/更正/审批表 文书记录ID */ relationApprovalDocumentId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result_1>({
        url: '/punish/stagedoc/common/saveCorrectionConfirmSend',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取文书html公共方法
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function getDocBaseInfo(
    data?: {
        /** 案件id */ caseId: string
        /** 文书编码 */ documentCatalogCode: string
        /** 操作类型不能为空(1-新增/2-修改) */ operateType?: string
        /** 文书id */ documentId?: string
        /** 当事人id */ partyId?: string
        /** 文书模板code */ documentTemplateCode?: string
        /** 被调查人id (笔录使用) */ surveyPeopleId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DocumentCommonFormHtmlVo>>({
        url: '/punish/stagedoc/common/getDocBaseInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取文书数据公共方法
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function getDocFormData(
    data?: {
        /** 案件id */ caseId: string
        /** 文书编码 */ documentCatalogCode: string
        /** 操作类型不能为空(1-新增/2-修改) */ operateType?: string
        /** 文书id */ documentId?: string
        /** 当事人id */ partyId?: string
        /** 文书模板code */ documentTemplateCode?: string
        /** 被调查人id (笔录使用) */ surveyPeopleId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DocumentCommonFormDataVo>>({
        url: '/punish/stagedoc/common/getDocFormData',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取文书数据公共方法(根据documentRecordId)
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getDocFormDataByDocRecordId(
    data?: {
        /** 案件id */ caseId: string
        /** 文书编码 */ documentCatalogCode: string
        /** 操作类型不能为空(1-新增/2-修改) */ operateType?: string
        /** 文书id */ documentId?: string
        /** 当事人id */ partyId?: string
        /** 文书模板code */ documentTemplateCode?: string
        /** 被调查人id (笔录使用) */ surveyPeopleId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DocumentCommonFormDataVo>>({
        url: '/punish/stagedoc/common/getDocFormDataByDocRecordId',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 文号测试使用，先勿删除
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function testNumber(
    data?: {
        caseId?: string
        catalogCode?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/stagedoc/common/testNumber',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 重新生成结案报告文书
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function rebuildPdf(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<{ [key: string]: any }>>({
        url: '/punish/stagedoc/common/rebuildPdf',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 预览文书接口
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function docPreview(
    data?: {
        /** 文书目录编码 */ documentCatalogCode: string
        /** 文书目录编码 */ caseId?: string
        /** 文书模板code */ documentTemplateCode?: string
        /** 模板类型 标准模板:standard;窄幅模板:narrow;
不传默认标准模板 */ templateType?: string
        /** 当事人ID */ partyId?: string
        /** 文书内容数据map */ dataMap?: any
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<{ [key: string]: any }>>({
        url: '/punish/stagedoc/common/docPreview',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.3.2】描述：根据文书目录编码获取法人或个人文件模板code
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author xiangyuyu
 */
export function getTemplateCodeByDocumentCatalogCode(
    data?: {
        /** 文书目录编码 */ documentCatalogCode: string
        /** 案件id */ caseId: string
        /** 参数信息 */ paramMap?: { [key: string]: any }
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/stagedoc/common/getTemplateCodeByDocumentCatalogCode',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 描述：获取案件相关文书文号
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function getDocumentNumber(
    data?: {
        caseId?: string
        /** 文件目录的代码 */ documentCatalogCode?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/stagedoc/common/getDocumentNumber',
        type: 'GET',
        data,
        ...options,
    })
}

export interface AppendixDto {
    /**
     * 案件附件名称
     */
    appendixName: string

    /**
     * 案件附件类型Id
     */
    appendixTypeId: string

    /**
     * 是否立案材料列表(0-否 1-是)
     */
    isMaterial: string

    /**
     * 案件附件地址
     */
    appendixUrl: string

    /**
     * 案件附件类型
     */
    appendixType: string
}

export interface zlbCaseDocumentRecordDto {
    /**
     * 浙里办操作类型（1-文书确认，2-文书签字）
     */
    zlbType: string
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

export interface CorrectionDocSaveDetailDto {
    /**
     * 文书模板类型 1:标准2：窄幅（不传默认为标准）
     */
    documentTemplateType: string

    /**
     * 关联文书的文书记录表ID
     */
    relationDocumentRecordId: string

    /**
     * 案件id
     */
    caseId: string

    /**
     * 文书目录编码
     */
    documentCatalogCode: string

    /**
     * 文书内容数据map
     */
    dataMap: any

    /**
     * 当事人id
     */
    partyId: string

    /**
     * 文书记录表ID
     */
    documentRecordId: string

    /**
     * 补正/更正/审批表 文书记录ID
     */
    relationApprovalDocumentId: string
}

export interface CorrectionDocSaveVo {
    /**
     * 补正/更正/审批表 文书记录ID
     */
    relationDocumentId: string

    /**
     * 补正/更正/审批表 文书记录ID
     */
    relationApprovalDocumentId: string
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

export interface DocumentCommonFormHtmlVo {
    /**
     * 模板字段配置
     */
    templateConfigMap: { [key: string]: any }

    /**
     * 模板code
     */
    templateCode: string

    /**
     * 模板code
     */
    templateName: string

    /**
     * html内容
     */
    htmlContent: string
}

export interface DocumentCommonFormDataVo {
    /**
     * 操作类型 (1-新增/2-修改)
     */
    operateType: string

    /**
     * 模板code
     */
    templateCode: string

    /**
     * 数据map
     */
    dataMap: { [key: string]: any }
}
