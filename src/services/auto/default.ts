/**
 * @file API：default
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 登录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuyongfei
 */
export function login(data?: {
/** 用户名 */ username: string, 
/** 密码 */ password: string, 
/** 登录类型 */ loginType: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<UserInfoVo>>({
        url: "/login",
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

export interface UserInfoVo {

    /**
     * 真实姓名
     */
    realName: string

    /**
     * 登录类型
     */
    loginType: string

    /**
     * 用户名
     */
    username: string

    /**
     * token
     */
    token: string

}

