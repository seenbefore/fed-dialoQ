import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface FileVO {
    /** 文件ID */
    id: string
    /** 文件名称 */
    name: string
    /** 文件类型 */
    type: string
    /** 文件大小 */
    size: string
    /**
     * 文件地址
     */
    url: string
    /** 修改时间 */
    updateTime: string
}

/**
 * 获取文件列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(
    data?: {
        /** 文件类型 */ type?: string
        /** 关键字 */ keyword?: string
        /** 页码 */ page?: number
        /** 每页条数 */ pageSize?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<FileVO[]>>>({
        url: '/file/list',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除文件
 */
export function remove(
    data?: {
        /** 文件ID */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/file/remove',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 批量删除文件
 */
export function removeBatch(
    data?: {
        /** 文件ID列表 */ ids: string[]
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/file/removeBatch',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 下载文件
 */
export function download(
    data?: {
        /** 文件ID */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/file/download',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 预览文件
 */
export function preview(
    data?: {
        /** 文件ID */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/file/preview',
        method: 'get',
        params: data,
        ...options,
    })
}
