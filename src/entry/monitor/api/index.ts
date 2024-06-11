import { http } from '../scripts/http'

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
 * 查询
 * @param {any} data:any={}
 * @returns {any}
 */
export async function list(data: any = {}) {
    const defaultData = {
        sort: {
            time: 'desc',
        },
        ...data,
    }

    return http.post<Result<Page<any[]>>>('/error/query', JSON.stringify(defaultData))
}
/**
 * 统计用户数和设备
 * @param {any} data:any={}
 * @returns {any}
 */
export async function termCount(data: any = {}) {
    const defaultData = {
        ...data,
    }

    return http.post<Result<any>>('/error/aggs/term/count', JSON.stringify(defaultData))
}

/**
 * 分组统计
 * @param {any} data:any={}
 * @returns {any}
 */
export async function summary(data: any = {}) {
    const defaultData = {
        ...data,
    }

    return http.post<Result<any[]>>('/error/aggs/summary', JSON.stringify(defaultData))
}

/**
 * 按时间统计
 * @param {any} data:any={}
 * @returns {any}
 */
export async function count(data: any = {}) {
    const defaultData = {
        ...data,
    }

    return http.post<Result<any[]>>('/error/aggs/histogram/count', JSON.stringify(defaultData))
}
