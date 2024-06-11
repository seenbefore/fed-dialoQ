/**
 * @file API：default
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 审查审批报告分页列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function examinereport(data?: {
id?: string, 
username?: string, 
password?: string, 
passwordSalt?: string, 
identity?: string, 
realName?: string, 
email?: string, 
createTime?: string, 
lastLoginTime?: string, 
status?: string, 
desc?: string, 
cerno?: string, 
employeeType?: string, 
post?: string, 
organizationCode?: string, 
workStatus?: string, 
phone?: string, 
cernoType?: string, 
userLoginNum?: number, 
lastModifyPwdTime?: string, 
roleLev?: string, 
roles?: string[], 
orgCode?: string, 
orgName?: string, 
simpleName?: string, 
roleName?: string, 
sort?: string, 
parentCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result>({
        url: "/examine-report/",
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

