/**
 * @file API：/sysCommon
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function selectForListMap(data?: {
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 是否分页查询 */ isPageSearch?: boolean, 
/** 业务请求参数 */ params?: {[key: string]: any}, 
/** 查询唯一标识不能为空 */ code?: string, 
/** 查询列索引 */ index?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<{[key: string]: any}[]>>({
        url: "/sysCommon/selectForListMap",
        type: "POST",
        data,
        ...options
    })
}

/**
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function selectValueByflag(data?: {
flag?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/sysCommon/selectValueByflag",
        type: "GET",
        data,
        ...options
    })
}

/**
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function selectTeeNode(data?: {
code?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<TreeNode[]>>({
        url: "/sysCommon/selectTeeNode",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 上传文件
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function uploadFile(data?: {
/** 文件 */ file?: any, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<SysCommonFileVO>>({
        url: "/sysCommon/uploadFile",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 下载文件
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function downloan(data?: {
/** 文件路径 */ filePath?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<any[]>>({
        url: "/sysCommon/downloan",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 下载文件,带文件名称
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function downloanWithName(data?: {
/** 文件路径 xxx/x/x/x.123.html */ filePath?: string, 
/** 文件名  123.html */ fileName?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<null>({
        url: "/sysCommon/downloanWithName",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 上传文件的前缀地址
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getHostName(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/sysCommon/getHostName",
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

export interface TreeNode {

    /**
     * 名称
     */
    name: string

    /**
     * 子节点
     */
    childrenNodeList: TreeNode[]

    /**
     * 编码
     */
    code: string

    /**
     * 级别
     */
    level: string

    /**
     * 编码
     */
    pCode: string

}

export interface SysCommonFileVO {

    /**
     * 文件名称
     */
    fileName: string

    /**
     * 文件路径
     */
    filePath: string

}

