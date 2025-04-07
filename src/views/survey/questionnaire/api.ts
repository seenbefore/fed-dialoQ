import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface QuestionnaireVO {
    /** ID */
    id: string
    /** 问卷标题 */
    title: string
    /** 答卷数量 */
    responseCount: number
    /** 发布状态 0草稿 1已发布 2已下线 */
    status: string
    /** 创建时间 */
    createTime: string
    /** 更新时间 */
    updateTime: string
    /** 问卷描述 */
    description?: string
    /** 问卷内容 */
    content?: string
    /** 是否匿名 */
    isAnonymous?: boolean
    /** 发布时间 */
    publishTime?: string
    /** 截止时间 */
    endTime?: string
}

/**
 * 获取问卷列表
 */
export function list(
    data?: {
        /** 问卷标题 */ title?: string
        /** 发布状态 */ status?: string
        /** 创建开始时间 */ createTimeStart?: string
        /** 创建结束时间 */ createTimeEnd?: string
        /** 页码 */ page?: number
        /** 每页条数 */ pageSize?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<QuestionnaireVO[]>>>({
        url: '/survey/questionnaire/list',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取问卷详情
 */
export function detail(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<QuestionnaireVO>>({
        url: '/survey/questionnaire/detail',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 保存问卷
 */
export function save(
    data?: {
        /** id */ id?: string
        /** 问卷标题 */ title: string
        /** 问卷描述 */ description?: string
        /** 问卷内容 */ content?: string
        /** 发布状态 */ status: string
        /** 是否匿名 */ isAnonymous?: boolean
        /** 截止时间 */ endTime?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/survey/questionnaire/save',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除问卷
 */
export function remove(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/survey/questionnaire/remove',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 发布/下线问卷
 */
export function updateStatus(
    data?: {
        /** id */ id: string
        /** 状态 */ status: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/survey/questionnaire/updateStatus',
        method: 'post',
        data,
        ...options,
    })
}
