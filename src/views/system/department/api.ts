import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { PageResponse, Result } from '@/@types'

export interface DepartmentVO {
    /** ID */
    id: string
    /** 创建人 */
    createUserString: string
    /** 创建时间 */
    createTime: string
    /** 是否禁用修改 */
    disabled: boolean
    /** 修改人 */
    updateUserString: string
    /** 修改时间 */
    updateTime: string
    /** 部门名称 */
    name: string
    /** 上级部门ID */
    parentId: string
    /** 状态(1=启用,2=禁用) */
    status: number
    /** 排序 */
    sort: number
    /** 是否为系统内置数据 */
    isSystem: boolean
    /** 描述 */
    description: string
    /** 子部门 */
    children?: DepartmentVO[]
}

/**
 * 获取部门分页列表
 */
export function list(
    data?: {
        /** 名称 */ name?: string
        /** 状态 */ status?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<DepartmentVO>>>({
        url: '/system/department/list',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 获取部门树
 */
export function tree(
    data?: {
        /** 名称 */ name?: string
        /** 状态 */ status?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DepartmentVO[]>>({
        url: '/system/department/tree',
        type: 'GET',
        params: data,
        ...options,
    })
}

/**
 * 保存部门
 */
export function save(
    data: {
        /** id */ id?: string
        /** 部门名称 */ name: string
        /** 状态(1=启用,2=禁用) */ status: number
        /** 描述 */ description?: string
        /** 上级部门ID */ parentId?: string
        /** 排序 */ sort?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<void>>({
        url: '/system/department/save',
        type: 'POST',
        data,
        ...options,
    })
}

/**
 * 删除部门
 */
export function remove(
    data: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<void>>({
        url: '/system/department/remove',
        type: 'GET',
        params: data,
        ...options,
    })
}

/**
 * 获取部门详情
 */
export function detail(
    data: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<DepartmentVO>>({
        url: '/system/department/detail',
        type: 'GET',
        params: data,
        ...options,
    })
}
