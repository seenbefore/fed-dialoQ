import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface PublicityVO {
    /** ID */
    id: string
    /** 公示信息类型 */
    type: string
    /** 状态 */
    status: string
    /** 操作人 */
    operator: string
    /** 更新时间 */
    updateTime: string
    /** 创建时间 */
    createTime: string
    /** 设定依据 */
    basis: string
    /** 公示信息 */
    publicityInfo: string[]
    /** 所属条线 */
    businessLine: string
    /** 行政区划 */
    area: string
    /** 执法主体名称 */
    subjectName: string
    /** 地址 */
    address: string
    /** 联系方式 */
    contact: string
    /** 执法主体类别 */
    subjectType: string
}

/**
 * 获取公示信息列表
 */
export function list(data?: any, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<PublicityVO[]>>>({
        url: '/law-supervision/publicity/pre-publicity/list',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 新增公示信息
 */
export function save(data?: Partial<PublicityVO>, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/law-supervision/publicity/pre-publicity/save',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除公示信息
 */
export function remove(data?: { id: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/law-supervision/publicity/pre-publicity/remove',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取公示信息详情
 */
export function detail(data?: { id: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<PublicityVO>>({
        url: '/law-supervision/publicity/pre-publicity/detail',
        method: 'get',
        params: data,
        ...options,
    })
}
