/**
 * @file API：/document/kindInfo
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { httpDoc } from '@/scripts/http'
import http from '@/scripts/http'

/**
 * 【V1.0.0】描述：根据获取文书种类信息分页列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function getDocumentKindInfoPageList(
    data?: {
        pageNum?: number
        length?: number
        orderField?: string
        orderMethod?: string
        deptSearchLikeStr?: string
        documentKindCode?: string
        documentKindName?: string
        documentType?: string
        status?: string
        applyScene?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return httpDoc.request<Result<PageResponse<DocumentKindInfoVo>>>({
        url: '/document/kindInfo/getDocumentKindInfoPageList',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.0.0】描述：获取文书种类信息列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function getDocumentKindInfoList(
    data?: {
        documentKindCode?: string
        documentKindName?: string
        documentType?: string
        status?: string
        applyScene?: string
        workStageCode?: string
        isOnlineDocument?: string
        isOfflineDocument?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return httpDoc.request<Result<DocumentKindInfoVo[]>>({
        url: '/document/kindInfo/getDocumentKindInfoList',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.0.0】描述：根据文书种类编码获取文书种类信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function getDocumentKindInfoByCode(
    data?: {
        /** 文件类型代码 */ documentKindCode?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return httpDoc.request<Result<DocumentKindInfoVo>>({
        url: '/document/kindInfo/getDocumentKindInfoByCode/{documentKindCode}',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.0.0】描述：删除文书种类信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function removeDocumentKindInfo(
    data?: {
        /** id */ id?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return httpDoc.request<Result<string>>({
        url: '/document/kindInfo/removeDocumentKindInfo/{id}',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.0.0】描述：更新文书种类状态
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function updateDocumentKindInfoStatus(
    data?: {
        id?: string
        status?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return httpDoc.request<Result<string>>({
        url: '/document/kindInfo/updateDocumentKindInfoStatus',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 【V1.0.0】描述：保存文书种类信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function saveDocumentKindInfo(
    data?: {
        operateType?: string
        id?: string
        documentKindCode?: string
        documentKindName?: string
        sort?: string
        documentType?: string
        status?: string
        applyScene?: string
        relationDocumentKindCode?: string
        description?: string
        createUserId?: string
        createUserName?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return httpDoc.request<Result<string>>({
        url: '/document/kindInfo/saveDocumentKindInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 注意：跑最新的api，接口报错，都说不知道，把杨星威分支存在的接口复制到接口引入的ts中
 * （一旦重新跑api,就会消失，我怀疑这个方法是他自己加的，不是api自己生成的，因为接口路径不对 /punish/ucase/case/main/document/modify/xxx，其他的是 /document/kindInfo/xxx）
 *
 * 保存通用文书修改记录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author shishengyao
 */
export function saveCaseDocumentModifyRecord(data?: saveCaseDocumentModifyRecordType, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: '/punish/ucase/case/main/document/modify/saveCaseDocumentModifyRecord',
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

export interface DocumentKindInfoVo {
    applySceneName: string

    documentType: string

    description: string

    createUserName: string

    sort: string

    documentKindCode: string

    documentKindName: string

    relationDocumentKindCode: string

    createTime: string

    id: string

    documentTypeName: string

    applyScene: string

    status: string
}

export interface modifyColumnListType {
    modifyColumnName: string
    columnContentBeforeModify: string
    columnContentAfterModify: string
}

export interface saveCaseDocumentModifyRecordType {
    caseId?: string
    documentCatalogCode?: string
    documentKindCode?: string
    modifyColumnList?: modifyColumnListType[]
    modifyReason?: string
    modifyReasonDesc?: string
    documentUrlBeforeModify?: string
    documentUrlAfterModify?: string
    relationDocumentKindCode?: string
    isNeedApproval?: string
    documentId?: string
    dataMap?: any[]
    approvalGeneralSubmitDto?: Record<string, string | void>
    partyId?: string
}
