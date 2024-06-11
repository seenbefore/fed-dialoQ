/**
 * @file API：/fileUpload
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 文件上传
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuyongfei
 */
export function upload(data?: {
/** 文件 */ files?: any, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<UploadResult[]>>({
        url: "/fileUpload/upload",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 文件删除
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuyongfei
 */
export function delete_1(data?: {
/** oss文件key */ ossFileKey?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/fileUpload/delete",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 文件下载
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuyongfei
 */
export function download(data?: {
/** oss文件key */ ossFileKey?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<null>({
        url: "/fileUpload/download",
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

export interface UploadResult {

    fileName: string

    code: number

    ossFileKey: string

    ossMd5: string

    url: string

    errorMsg: string

}

