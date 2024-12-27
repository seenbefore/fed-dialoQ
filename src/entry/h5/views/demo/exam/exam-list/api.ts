import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'
import { Result, PageResponse } from '@/@types'

// 考试状态枚举
export enum ExamStatus {
    NOT_START = 'not_start', // 未开始
    IN_PROGRESS = 'in_progress', // 考试中
    FINISHED = 'finished', // 已结束
}

export interface ExamItem {
    id: string
    title: string
    startTime: string
    endTime: string
    duration: string
    status: ExamStatus
}
// 考试列表数据
const EXAM_LIST = [
    {
        id: '1',
        title: '2024年安全法规培训知识测评',
        startTime: '2024/11/5 9:00:00',
        endTime: '2024/11/5 10:00:00',
        duration: '60分钟',
        status: ExamStatus.NOT_START,
    },
    {
        id: '2',
        title: '2024年安全法规培训知识测评',
        startTime: '2024/11/5 9:00:00',
        endTime: '2024/11/5 10:00:00',
        duration: '60分钟',
        status: ExamStatus.IN_PROGRESS,
    },
    {
        id: '3',
        title: '2024年安全法规培训知识测评',
        startTime: '2024/11/5 9:00:00',
        endTime: '2024/11/5 10:00:00',
        duration: '60分钟',
        status: ExamStatus.IN_PROGRESS,
    },
    {
        id: '4',
        title: '2024年安全法规培训知识测评',
        startTime: '2024/11/5 9:00:00',
        endTime: '2024/11/5 10:00:00',
        duration: '60分钟',
        status: ExamStatus.FINISHED,
    },
]

/**
 * 获取考试列表
 * @param params.page 页码，从1开始
 * @param params.pageSize 每页数量
 */
export const getExamList = async (
    params?: {
        page?: number
        pageSize?: number
    },
    options?: ExAxiosRequestConfig,
) => {
    return http.post<Result<ExamItem[]>>('/exam/list', params, options)
}
