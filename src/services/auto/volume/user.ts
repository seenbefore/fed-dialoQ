/**
 * @file API：/volume/user
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 根据token获取用户信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getUserInfoByToken(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<UserInfo>>({
        url: "/volume/user/getUserInfoByToken",
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

export interface UserInfo {

    /**
     * 机构名称
     */
    deptName: string

    /**
     * 部门名称
     */
    orgName: string

    /**
     * 手机号
     */
    phone: string

    /**
     * 部门编码
     */
    orgCode: string

    /**
     * 用户名
     */
    userName: string

    /**
     * 用户id
     */
    userId: string

    /**
     * 机构编码
     */
    deptCode: string

}

