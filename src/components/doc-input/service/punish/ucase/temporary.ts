/**
 * @file API：/punish/ucase/temporary
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '@/scripts/http'

/**
 * 文书暂存功能--通用
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author :
 */
export function saveTemporary(
    data?: {
        /** 当事人id */ partyId?: string
        /** 案件id */ caseId?: string
        /** 案件副流程id */ caseAssistId?: string
        /** 文书目录编码 */ documentCatalogCode?: string
        /** 文书保存数据 */ dataMap?: JSONObject
        /** 文书id */ documentId?: string
        /** 补正/更正文书暂存时，关联的文书 */ relationDocumentId?: string
        /** 附件信息列表 */ appendixList?: AppendixDto[]
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result>({
        url: '/punish/ucase/temporary/saveTemporary',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取文书暂存记录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getDocTemporaryRecord(
    data?: {
        /** 案件id */ caseId: string
        /** 文书目录编码 */ documentCatalogCode: string
        /** 当事人id */ partyId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result_1<JSONObject>>({
        url: '/punish/ucase/temporary/getDocTemporaryRecord',
        type: 'POST',
        data,
        ...options,
    })
}

export interface JSONObject {
    map: { [key: string]: any }
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

export interface Result {
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

export interface Result_1<T> {
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
