import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface DictTypeVO {
    /** id */
    id: number
    /** 创建人 */
    createUserString: string
    /** 创建时间 */
    createTime: string
    /** 更新人 */
    updateUserString: string | null
    /** 更新时间 */
    updateTime: string | null
    /** 类型名称 */
    name: string
    /** 类型编码 */
    code: string
    /** 描述 */
    description: string | null
    /** 是否系统内置 */
    isSystem: boolean
}

export interface DictValueVO {
    /** id */
    id: number
    /** 标签 */
    name: string
    /** 值 */
    value: string
    /** 排序 */
    sort: number
    /** 状态 0停用 1启用 */
    status: string
    /** 创建时间 */
    createTime: string
}

/**
 * 获取字典类型列表
 */
export function getTypeList(options?: ExAxiosRequestConfig) {
    return http.request<{
        code: string
        msg: string
        success: boolean
        timestamp: number
        data: DictTypeVO[]
    }>({
        url: '/dict/type/list',
        method: 'get',
        ...options,
    })
}

/**
 * 获取字典值列表
 */
export function list(
    data?: {
        /** 字典类型 */ dictType?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<
        Result<{
            data: DictValueVO[]
        }>
    >({
        url: '/dict/list',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 保存字典
 */
export function save(
    data?: {
        /** id */ id?: number
        /** 字典类型 */ dictType?: string
        /** 标签 */ name?: string
        /** 值 */ value?: string
        /** 排序 */ sort?: number
        /** 状态 */ status?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/dict/save',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除字典
 */
export function remove(
    data?: {
        /** id */ id: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/dict/delete',
        method: 'post',
        data,
        ...options,
    })
}
