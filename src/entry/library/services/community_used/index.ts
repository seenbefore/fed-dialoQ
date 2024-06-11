import { ExAxiosRequestConfig } from 'icinfo-request'
import http from '@/entry/library/scripts/http'
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
}

export interface Page<T> {
    /**
     * 返回编码.200=成功
     */
    total: number

    page: number
    pages: number
    pageSize: number
    /**
     * 返回数据
     */
    list: T
    data: T
}

/**
 * 创建
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function create(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/community_used/create',
        method: 'POST',
        data,
        ...options,
    })
}

/**
 * 详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function get(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/community_used/get',
        method: 'POST',
        data,
        ...options,
    })
}

/**
 * 列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<Page<any>>>({
        url: '/community_used/list',
        method: 'POST',
        data,
        ...options,
    })
}

/**
 * 删除
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function remove(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/community_used/remove',
        method: 'POST',
        data,
        ...options,
    })
}

/**
 * 更新
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function update(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/community_used/update',
        method: 'POST',
        data,
        ...options,
    })
}
