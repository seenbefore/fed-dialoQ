/**
 * @file API：/punish/ucase/archive
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '@/scripts/http'

/**
 * 【V1.9.4】描述：查询电子卷宗列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function getElectricArchiveRecordList(
    data?: {
        pageNum?: number
        length?: number
        orderField?: string
        orderMethod?: string
        /** 卷宗号 */ archiveNumber?: string
        /** 卷宗名称 */ archiveName?: string
        /** 办案单位编码 */ handDeptCode?: string
        /** 手部门代码列表 */ handDeptCodeList?: string
        /** 机构编码 */ orgCode?: string
        /** 办案单位名称 */ handDeptName?: string
        /** 案件名称 */ caseName?: string
        /** 案件信息关键字 */ caseInfoKeyword?: string
        /** 当事人名称 */ partyName?: string
        /** 更新时间开始 */ updateTimeStart?: string
        /** 更新时间结束 */ updateTimeEnd?: string
        /** 用户id */ userId?: string
        /** 标签列表--不用传 */ tagList?: any[]
        /** 机构编码列表--不用传 */ orgCodeList?: any[]
        /** 部门编码列表--不用传 */ deptCodeList?: any[]
        /** 部门机构判断--不用传 */ org?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<CaseElectricArchiveRecordDetailVo>>>({
        url: '/punish/ucase/archive/getElectricArchiveRecordList',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.9.4】描述：保存电子卷宗
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function saveElectricArchive(
    data?: {
        /** 电子卷宗id */ archiveId?: string
        /** 案件id */ caseId?: string
        /** 卷宗名称 */ archiveName?: string
        /** 卷宗名称 */ archiveNumber?: string
        /** 文件列表 */ archiveCatalogContentList?: CaseElectricArchiveCatalogContent[]
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<CaseElectricArchiveRecordDetailVo>>>({
        url: '/punish/ucase/archive/saveElectricArchive',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.9.4】描述：保存电子卷宗
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function calculateElectricArchivePageNumber(
    data?: {
        /** 电子卷宗id */ archiveId?: string
        /** 案件id */ caseId?: string
        /** 卷宗名称 */ archiveName?: string
        /** 卷宗名称 */ archiveNumber?: string
        /** 文件列表 */ archiveCatalogContentList?: CaseElectricArchiveCatalogContent[]
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<CaseElectricArchiveCatalogContent[]>>({
        url: '/punish/ucase/archive/calculateElectricArchivePageNumber',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.9.4】描述：查询电子卷宗相关文件列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function getCaseElectricArchiveDocumentList(
    data?: {
        /** 电子卷宗id */ archiveId?: string
        /** 案件id */ caseId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<CaseElectricArchiveCatalogContent[]>>({
        url: '/punish/ucase/archive/getCaseElectricArchiveDocumentList',
        type: 'POST',
        data,
        ...options,
    })
}
/**
 * 【V2.5.3】描述：查询电子卷宗卷内考核表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function getElectricWlExtendInfo(
    data?: {
        /** 电子卷宗id */ archiveId?: string
        /** 案件id */ caseId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<IWlExtendDto>>({
        url: '/punish/ucase/archive/getElectricWlExtendInfo',
        type: 'POST',
        data,
        ...options,
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
    recordsFiltered: string

    draw: number

    data: T[]

    error: string

    recordsTotal: string
}

export interface CaseElectricArchiveRecordDetailVo {
    /**
     * 卷宗名称
     */
    archiveName: string

    /**
     * 修改人姓名
     */
    updateUserName: string

    /**
     * 卷宗地址
     */
    archiveUrl: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 当事人类型 person个人，legal公司法人  multitude 多个当事人
     */
    partyType: string

    /**
     * 统一信用代码
     */
    uniscid: string

    /**
     * 案件编号
     */
    caseNumber: string

    /**
     * 案件id
     */
    caseId: string

    /**
     * 办案单位名称
     */
    handDeptName: string

    /**
     * 当事人名称
     */
    partyName: string

    /**
     * 案件名称
     */
    caseName: string

    /**
     * 卷宗号
     */
    id: string

    /**
     * 卷宗号
     */
    archiveNumber: string
}

export interface CaseElectricArchiveCatalogContent {
    /**
     * 文档证据类型
     */
    documentEvidenceType: string

    /**
     * 页数
     */
    pageCount: number

    /**
     * 文档证据来源
     */
    documentEvidenceSource: string

    /**
     * 页码
     */
    pageNumber: string

    /**
     * 文档证据名称
     */
    documentEvidenceName: string

    /**
     * 文号
     */
    documentNumber: string

    documentEvidenceCode: string

    /**
     * 文档证据地址
     */
    documentEvidenceUrl: string

    /**
     * 排序
     */
    sort: number

    /**
     * 文档证据id(唯一标识)
     */
    documentEvidenceId: string
}

export interface IWlExtendDto {
    /**立卷人 */
    filingPerson: string
    /**电子卷宗情况说明 */
    dossierSituation: string
    /**检查人 */
    checkPerson: string
    /**立卷时间 */
    filingTime: string
    /**检查时间 */
    checkTime: string
}
