/**
 * @file API：/common/volume
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 生成卷宗文书
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function fileGenerate(data?: {
/** 模版编码 */ templateCode: string, 
/** 参数Map */ paramMap: any, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<VolumeFileGenerateVO>>({
        url: "/common/volume/fileGenerate",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 获取文书模板
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getDocBaseInfo(data?: {
/** 模板code */ templateCode: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<DocumentCommonFormHtmlVo>>({
        url: "/common/volume/getDocBaseInfo",
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

export interface VolumeFileGenerateVO {

    /**
     * 文件URL地址
     */
    fileUrl: string

    /**
     * 文件base64
     */
    fileBase64: string

}

export interface DocumentCommonFormHtmlVo {

    /**
     * 模板字段配置
     */
    templateConfigMap: {[key: string]: any}

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

