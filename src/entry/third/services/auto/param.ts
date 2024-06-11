/**
 * @file API：/param
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * Description 更新系统参数值
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function updateParam(data?: {
/** 自增标识 */ id?: number, 
/** 唯一标识 */ uid?: string, 
/** 参数名称 */ name?: string, 
/** 参数标识 */ flag?: string, 
/** 参数值 */ value?: string, 
/** 备注 */ remark?: string, 
/** 是否决策（0：否  1：是） */ isDecision?: string, 
/** 附加信息 */ addition?: string, 
/** 创建者标识 */ createrId?: string, 
/** 创建时间 */ createTime?: string, 
/** 操作者标识 */ operaterId?: string, 
/** 操作时间 */ operateTime?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/param/updateParam",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 根据flag查询参数
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liushijun
 */
export function getParam(data?: {
paramFlag?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<Param>>({
        url: "/param/getParam",
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

export interface Param {

    /**
     * 参数标识
     */
    flag: string

    /**
     * 操作时间
     */
    operateTime: string

    /**
     * 是否决策（0：否  1：是）
     */
    isDecision: string

    /**
     * 备注
     */
    remark: string

    /**
     * 唯一标识
     */
    uid: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 操作者标识
     */
    operaterId: string

    /**
     * 参数名称
     */
    name: string

    /**
     * 自增标识
     */
    id: number

    /**
     * 创建者标识
     */
    createrId: string

    /**
     * 参数值
     */
    value: string

    /**
     * 附加信息
     */
    addition: string

}

