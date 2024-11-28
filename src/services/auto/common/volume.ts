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

