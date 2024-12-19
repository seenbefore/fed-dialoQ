import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface ArticleVO {
    /** ID */
    id: string
    /** 文章标题 */
    title: string
    /** 文章分类 */
    category: string
    /** 作者 */
    author: string
    /** 阅读量 */
    readCount: number
    /** 发布状态 0草稿 1待审核 2已发布 3已下线 */
    status: string
    /** 创建时间 */
    createTime: string
    /** 更新时间 */
    updateTime: string
    /** 封面图片 */
    coverImage?: string
    /** 文章摘要 */
    summary?: string
    /** 文章内容 */
    content: string
    /** 标签 */
    tags?: string[]
    /** 是否置顶 */
    isTop: boolean
    /** 发布时间 */
    publishTime?: string
}

/**
 * 获取文章列表
 */
export function list(
    data?: {
        /** 文章标题 */ title?: string
        /** 文章分类 */ category?: string
        /** 发布状态 */ status?: string
        /** 创建开始时间 */ createTimeStart?: string
        /** 创建结束时间 */ createTimeEnd?: string
        /** 作者 */ author?: string
        /** 页码 */ page?: number
        /** 每页条数 */ pageSize?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<ArticleVO[]>>>({
        url: '/content/article/list',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取文章详情
 */
export function detail(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<ArticleVO>>({
        url: '/content/article/detail',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 保存文章
 */
export function save(
    data?: {
        /** id */ id?: string
        /** 文章标题 */ title: string
        /** 文章分类 */ category: string
        /** 作者 */ author: string
        /** 封面图片 */ coverImage?: string
        /** 文章摘要 */ summary?: string
        /** 文章内容 */ content: string
        /** 标签 */ tags?: string[]
        /** 发布状态 */ status: string
        /** 是否置顶 */ isTop: boolean
        /** 发布时间 */ publishTime?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/content/article/save',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除文章
 */
export function remove(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/content/article/remove',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 发布/下线文章
 */
export function updateStatus(
    data?: {
        /** id */ id: string
        /** 状态 */ status: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/content/article/updateStatus',
        method: 'post',
        data,
        ...options,
    })
}
