import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result } from '@/@types'

export interface DepartmentVO {
    /** ID */
    id: string
    /** 名称 */
    name: string
    /** 状态 0禁用 1启用 */
    status: string
    /** 描述 */
    description: string
    /** 创建时间 */
    createTime: string
    /** 子部门 */
    children?: DepartmentVO[]
}

/**
 * 获取部门列表
 */
export function list(
    data?: {
        /** 名称 */ name?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DepartmentVO[]>>({
        url: '/department/list',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 保存部门
 */
export function save(
    data?: {
        /** id */ id?: string
        /** 名称 */ name?: string
        /** 状态 */ status?: string
        /** 描述 */ description?: string
        /** 父级ID */ parentId?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/department/save',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 删除部门
 */
export function remove(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/department/remove',
        type: 'GET',
        params: data,
        ...options,
    })
}

/**
 * 获取部门详情
 */
export function detail(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DepartmentVO>>({
        url: '/department/detail',
        type: 'GET',
        params: data,
        ...options,
    })
}
