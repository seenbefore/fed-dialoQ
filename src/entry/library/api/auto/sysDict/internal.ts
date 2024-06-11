/**
 * @file API：/sysDict/internal
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from "@/entry/library/scripts/http"

/**
 * 获取所有内置的字典.
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author ZhangXiaoYan
 */
export function list(data?: {
/** 字典code 如 ci_status */ dictCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<InternalDictListVO[]>>({
        url: "/sysDict/internal/list",
        type: "GET",
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

export interface DropDownVo {

    value: string

    label: string

}

export interface InternalDictListVO {

    /**
     * 字典编码
     */
    dictCode: string

    /**
     * 字典值
     */
    dictValueList: DropDownVo[]

}

