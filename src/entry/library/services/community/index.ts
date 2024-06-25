import http from '@library/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'
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
        url: '/community/create',
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
        url: '/community/get',
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
        url: '/community/list',
        method: 'POST',
        data,
        ...options,
    })
}

/**
 * 相似推荐
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function similar(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/community/similar',
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
        url: '/community/remove',
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
        url: '/community/update',
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
export function updateBody(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/community/updateBody',
        method: 'POST',
        data,
        ...options,
    })
}

/**
 * 浏览
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function views(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/community/views',
        method: 'POST',
        data,
        ...options,
    })
}

/**
 * 点赞
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function like(data?: {}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/community/like',
        method: 'POST',
        data,
        ...options,
    })
}
/**
 * 下架
 * @param data 要提交给服务器的数据
 * @param data.id 素材id
 * @param options 附加选项
 */
export function unpublish(
    data: {
        /** 素材id */
        id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/community/unpublish', // 假设这是处理下架操作的服务器端点
        method: 'POST', // 假设下架操作是通过POST方法发送的
        data,
        ...options,
    })
}

/**
 * 扫描统计
 * @param data 要提交给服务器的数据
 * @param data.rule 规则内容
 * @param options 附加选项
 */
export function stat(
    data: {
        /** 规则 */
        rule: string
        /**
         * 组件标题
         */
        title: string
        /**
         * 并发数
         */
        limit?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/community/stat', // 假设这是处理下架操作的服务器端点
        method: 'POST', // 假设下架操作是通过POST方法发送的
        data,
        ...options,
    })
}
