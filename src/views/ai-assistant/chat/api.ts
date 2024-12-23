import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface ChatMessage {
    /** 消息ID */
    id: string
    /** 会话ID */
    sessionId: string
    /** 发送者类型(user/ai) */
    sender: 'user' | 'ai'
    /** 消息内容 */
    content: string
    /** 发送时间 */
    createTime: string
    /** 状态(generating/completed/error) */
    status?: string
}

export interface ChatSession {
    /** 会话ID */
    id: string
    /** 会话标题 */
    title: string
    /** 最后消息 */
    lastMessage: string
    /** 更新时间 */
    updateTime: string
    /** 消息数量 */
    messageCount: number
    /** 是否收藏 */
    isFavorite: boolean
    /** 是否置顶 */
    isTop: boolean
}

/**
 * 获取会话列表
 */
export function getSessionList(
    data?: {
        keyword?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<ChatSession[]>>({
        url: '/chat/sessions',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 获取会话消息列表
 */
export function getMessageList(
    data: {
        sessionId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<ChatMessage[]>>({
        url: '/chat/messages',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 发送消息
 */
export function sendMessage(
    data: {
        sessionId: string
        content: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<ChatMessage>>({
        url: '/chat/messages/send',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除会话
 */
export function deleteSession(
    data: {
        sessionId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<void>>({
        url: '/chat/sessions/delete',
        method: 'post',
        data,
        ...options,
    })
}
