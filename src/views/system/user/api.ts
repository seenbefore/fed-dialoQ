import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'
export interface UserVO {
    /** id */
    id: string
    /** 区划 */
    area: string
    /** 姓名 */
    name: string
    /** 手机号码 */
    mobile: string
    /** 角色 */
    role: string
    /** 备注 */
    remark: string
    /** 状态 0停用 1启用 */
    status: string
}

/**
 * 获取用户列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(
    data?: {
        /** 姓名/账号 */ keyword?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<UserVO[]>>>({
        url: '/user/list',
        method: 'POST',
        data,
        ...options,
    })
}

export function save(
    data?: {
        /** id */ id?: string
        /** 区划 */ area?: string
        /** 姓名 */ name?: string
        /** 手机号码 */ mobile?: string
        /** 角色 */ role?: string
        /** 备注 */ remark?: string
        /** 状态 */ status?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/user/save',
        method: 'POST',
        data,
        ...options,
    })
}

export function remove(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/user/remove',
        method: 'GET',
        params: data,
        ...options,
    })
}

export function detail(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<UserVO>>({
        url: '/user/detail',
        method: 'GET',
        params: data,
        ...options,
    })
}
