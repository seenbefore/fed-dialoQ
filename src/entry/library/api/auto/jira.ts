/**
 * @file API：/jira
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import http from "@/entry/library/scripts/http"

/**
 * 定时统计信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function dingJiraStat(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/jira/dingJiraStat",
        type: "GET",
        data,
        ...options
    })
}

/**
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function tm(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/jira/tm",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 各项目top问题统计
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function dingJiraStatForTopTen(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/jira/dingJiraStatForTopTen",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 关闭问题时统计超时人员
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuyongfei
 */
export function assignRoamStat(data?: {
/** 问题id */ issueId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/jira/assignRoamStat",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 向jira问题中添加注释
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuyongfei
 */
export function addCommentToIssue(data?: {
/** 问题key */ issueKey: string, 
/** 问题内容 */ comment: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/jira/addCommentToIssue",
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

