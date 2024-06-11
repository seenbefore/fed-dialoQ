import http from '@/entry/h5/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

export type IDocParams = {
    /* 文书目录配置关联关系编码 */
    documentCatalogCode: string
    /* 业务id */
    serviceId?: string
    taskEntId: string
    taskOrgId: string
    legalEntityId: string
    /* 对象类型 1: 特种设备 2:场地场所  3:特定人员  4:特定产品  5:项目工程   6:执行标准  7: 机构类主体  8:自然人主体   9:设施设备 */
    legalEntityType: string
    /* (1-新增/2-修改) */
    operateType?: string
    /* documentId */
    documentId?: string
    partyId?: string
    documentTemplateCode?: string
    /* 0-否/1-是） */
    isApp?: string
    /* 模板样式类别 standard 标准模板，narrow 窄幅模板*/
    documentTemplateType?: string
    deptResultId?: string
} & {
    [key: string]: any
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

export interface DocumentCommonFormHtmlVo {
    templateConfigMap: { [key: string]: any }
    templateCode: string
    templateName: string
    htmlContent: string
}

export interface DocumentCommonFormDataVo {
    operateType: string

    templateCode: string

    dataMap: { [key: string]: any }
}

/**
 * 获取文书html公共方法
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author cyy
 */
export function getDocBaseInfo(data?: IDocParams, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<DocumentCommonFormHtmlVo>>({
        url: '/taskCheck/doc/common/getDocBaseInfo',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取文书数据公共方法
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author cyy
 */
export function getDocFormData(data?: IDocParams, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<DocumentCommonFormDataVo>>({
        url: '/taskCheck/doc/common/getDocFormData',
        type: 'POST',
        data,
        ...options,
    })
}
