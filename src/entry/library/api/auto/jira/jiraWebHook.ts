/**
 * @file API：/jira/jiraWebHook
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from "@/entry/library/scripts/http"

/**
 * 行政执法催处理及高优先级问题.
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author ZhangXiaoYan
 */
export function _1(data?: {
projectKey?: string, 
issueKey?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/jira/jiraWebHook/{projectKey}/{issueKey}",
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

