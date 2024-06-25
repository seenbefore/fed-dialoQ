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
export class User {
    id: any
    role?: string = ''
    phone?: string
    token?: string

    // 英文名
    username = ''
    avatar_url?: string
    // 中文名
    name?: string
    password?: string
    email?: string
    isDeleted?: number
    createdAt?: number
    createdUser?: string
    updatedAt?: number
    updatedUser?: string
    position?: string
    /**
     * 部门名称
     */
    orgName?: string
}
export class UserService {
    static findPassword(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User>>({
            url: '/user/findPassword',
            method: 'POST',
            data,
            ...options,
        })
    }
    static autoLogin(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User>>({
            url: '/user/auto-login',
            method: 'POST',
            data,
            ...options,
        })
    }
    static register(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static create(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/create',
            method: 'POST',
            data,
            ...options,
        })
    }
    static login(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/login',
            method: 'POST',
            data,
            ...options,
        })
    }
    static findAll(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User[]>>({
            url: '/user/findAll',
            method: 'POST',
            data,
            ...options,
        })
    }
    /**
     * 获取人员Options
     * @param payload
     * @param options
     * @returns
     */
    static async getUserOptions(payload?: any, options?: ExAxiosRequestConfig) {
        const { data } = await http.request<Result<User[]>>({
            url: '/user/findAll',
            method: 'POST',
            data: payload,
            ...options,
        })
        const result = data.map(item => {
            const value = item.username
            const label = item.name
            return {
                ...item,
                label,
                value,
            }
        })

        return result
    }
    /**
     * 获取产品人员列表
     * @param payload
     * @param options
     * @returns
     */
    static async getProductUserOptions(payload?: any, options?: ExAxiosRequestConfig) {
        const { data } = await http.request<Result<User[]>>({
            url: '/user/findAll',
            method: 'POST',
            data: payload,
            ...options,
        })
        return data
            .filter(item => {
                return ['产品经理'].includes(item.position!)
            })
            .map(item => {
                return {
                    label: item.name,
                    value: item.username,
                }
            })
    }
    /**
     * 获取设计人员列表
     * @param payload
     * @param options
     * @returns
     */
    static async getUedUserOptions(payload?: any, options?: ExAxiosRequestConfig) {
        const { data } = await http.request<Result<User[]>>({
            url: '/user/findAll',
            method: 'POST',
            data: payload,
            ...options,
        })
        return data
            .filter(item => {
                return ['设计师'].includes(item.position!)
            })
            .map(item => {
                return {
                    label: item.name,
                    value: item.username,
                }
            })
    }
    // 获取应用分支列表 不分页
    static list(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<Page<User[]>>>({
            url: '/user/list',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static findOne(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User>>({
            url: '/user/findOne',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static get(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User>>({
            url: '/user/get',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static current(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<User>>({
            url: '/user/current',
            method: 'POST',
            data,
            ...options,
        })
    }
    // 获取应用分支列表 不分页
    static remove(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/remove',
            method: 'POST',
            data,
            ...options,
        })
    }
    static update(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/update',
            method: 'POST',
            data,
            ...options,
        })
    }
    static update_password(data?: any, options?: ExAxiosRequestConfig) {
        return http.request<Result<any>>({
            url: '/user/update/password',
            method: 'POST',
            data,
            ...options,
        })
    }
}
