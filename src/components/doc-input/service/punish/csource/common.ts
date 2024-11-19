/**
 * @file API：/punish/csource/common
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '@/scripts/http'

/**
 * 描述：案源保存文书信息通用接口
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function saveCSourceDocInfo(
    data?: {
        /** 案源id */ caseSourceId: string
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
        /** 操作类型 register:登记/appoint:指派 ;modify修改 */ caseSourceOperateType?: string
        /** 原来的文书id （案源修改时使用） */ originDocumentId?: string
        /** 原来的文书编号 （案源修改时使用） */ originDocumentNumber?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<{ [key: string]: any }>>({
        url: '/punish/csource/common/saveCSourceDocInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取案源文书html公共方法
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function getCSourceDocBaseInfo(
    data?: {
        /** 案源id */ caseSourceId: string
        /** 文书编码 */ documentCatalogCode: string
        /** 操作类型不能为空(1-新增/2-修改) */ operateType?: string
        /** 文书id */ documentId?: string
        /** 当事人id */ partyId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DocumentCommonFormHtmlVo>>({
        url: '/punish/csource/common/getCSourceDocBaseInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取文书数据公共方法
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function getCSourceDocFormData(
    data?: {
        /** 案源id */ caseSourceId: string
        /** 文书编码 */ documentCatalogCode: string
        /** 操作类型不能为空(1-新增/2-修改) */ operateType?: string
        /** 文书id */ documentId?: string
        /** 当事人id */ partyId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DocumentCommonFormDataVo>>({
        url: '/punish/csource/common/getCSourceDocFormData',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 描述：根据文书目录编码获取法人或个人文件模板code
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liyafeng
 */
export function getTemplateCodeByDocumentCatalogCode(
    data?: {
        /** 文书目录编码 */ documentCatalogCode: string
        /** 案源id */ caseSourceId: string
        /** 参数信息 */ paramMap?: { [key: string]: any }
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<string>>({
        url: '/punish/csource/common/getTemplateCodeByDocumentCatalogCode',
        type: 'POST',
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
