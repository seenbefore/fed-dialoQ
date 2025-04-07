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

export interface ResponseVO {
    /** ID */
    id: string
    /** 问卷ID */
    questionnaireId: string
    /** 问卷标题 */
    questionnaireTitle: string
    /** 答卷内容 */
    content: string
    /** 提交时间 */
    submitTime: string
    /** 提交人 */
    submitter?: string
    /** 提交人ID */
    submitterId?: string
    /** 答题耗时(秒) */
    duration?: number
}

export interface StatisticsVO {
    /** 问卷ID */
    questionnaireId: string
    /** 问卷标题 */
    questionnaireTitle: string
    /** 总答卷数 */
    totalResponses: number
    /** 问题统计 */
    questionStats: QuestionStatVO[]
}

export interface QuestionStatVO {
    /** 问题ID */
    questionId: string
    /** 问题标题 */
    questionTitle: string
    /** 问题类型 */
    questionType: string
    /** 选项统计 */
    optionStats?: OptionStatVO[]
    /** 文本回答 */
    textResponses?: string[]
}

export interface OptionStatVO {
    /** 选项ID */
    optionId: string
    /** 选项文本 */
    optionText: string
    /** 选择次数 */
    count: number
    /** 选择百分比 */
    percentage: number
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
 * 获取问卷答卷列表
 */
export function responseList(
    data?: {
        /** 问卷ID */ questionnaireId: string
        /** 提交开始时间 */ submitTimeStart?: string
        /** 提交结束时间 */ submitTimeEnd?: string
        /** 提交人 */ submitter?: string
        /** 页码 */ page?: number
        /** 每页条数 */ pageSize?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<ResponseVO[]>>>({
        url: '/survey/response/list',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取答卷详情
 */
export function responseDetail(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<ResponseVO>>({
        url: '/survey/response/detail',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 获取问卷统计数据
 */
export function statistics(
    data?: {
        /** 问卷ID */ questionnaireId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<StatisticsVO>>({
        url: '/survey/statistics/questionnaire',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 导出答卷数据
 */
export function exportResponses(
    data?: {
        /** 问卷ID */ questionnaireId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Blob>({
        url: '/survey/response/export',
        method: 'get',
        params: data,
        responseType: 'blob',
        ...options,
    })
}
