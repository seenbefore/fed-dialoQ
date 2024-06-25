/**
 * @file API：/component/url
 */

import http from "@library/scripts/http"
import { ExAxiosRequestConfig } from 'icinfo-request'

/**
 * 组件URL-保存信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 链接信息 */ urlList?: ComponentInfoSave[], 
/** 组件id */ componentId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/component/url/save",
        type: "POST",
        data,
        ...options
    })
}

export interface ComponentInfoSave {

    /**
     * 链接名称
     */
    urlName: string

    /**
     * 备注信息
     */
    remark: string

    /**
     * id 有值则更新 无值则新增
     */
    id: string

    /**
     * 链接地址
     */
    url: string

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

