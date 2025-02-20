import { API_CONFIG } from './config'
import axios from 'axios'
import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result } from '@/@types'
import { MessageStatusEnum } from './enum'

export interface ChatSession {
    id: string
    title: string
    lastMessage: string
    updateTime: string
    messageCount: number
    isFavorite: boolean
    isTop: boolean
}

export interface ChatMessage {
    id: string
    sessionId: string
    sender: 'user' | 'ai'
    content: string
    createTime: string
    status: MessageStatusEnum
}

// 创建axios实例
const chatAPI = axios.create({
    baseURL: API_CONFIG.baseURL,
    headers: {
        Authorization: `Bearer ${API_CONFIG.token}`,
        'Content-Type': 'application/json',
    },
})

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

export async function sendMessage(data: { sessionId: string; content: string }) {
    const response = await chatAPI.post('/chat/completions', {
        model: API_CONFIG.model,
        messages: [
            { role: 'system', content: 'Initiate your response with "<think>\\n嗯" at the beginning of every output.' },
            {
                role: 'user',
                content: data.content,
            },
        ],
    })

    // 处理响应
    const aiMessage = response.data.choices[0].message.content

    return {
        code: 200,
        data: {
            id: response.data.id,
            sessionId: data.sessionId,
            sender: 'ai' as const,
            content: aiMessage,
            createTime: new Date().toLocaleString('zh-CN'),
            status: MessageStatusEnum.COMPLETED,
        },
        message: '发送成功',
    }
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
