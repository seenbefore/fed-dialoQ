import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'
import { Result, PageResponse } from '@/@types'

// 考试状态枚举
export enum ExamStatus {
    NOT_START = 'not_start', // 未开始
    IN_PROGRESS = 'in_progress', // 考试中
    FINISHED = 'finished', // 已结束
}

export interface ExamPaperVO {
    id: string
    paperDesc: string
    totalQuestions: number
    multipleChoiceCount: number
    singleChoiceCount: number
    creatorId: string
    creatorName: string
    updateTime: string
    remark: string
    totalScore: number
    passScore: number
    duration: number
    paperTypeCode: string
    createTime: string
    paperName: string
    singleChoiceScore: number
    multipleChoiceScore: number
    paperTypeName: string
    startTime: string
    judgeScore: number
    endTime: string
    judgeCount: number
    status: string
}

/**
 * 获取考试列表
 * @param params.pageNum 页码，从1开始
 * @param params.length 每页数量
 * @param params.paperName 考卷名称关键字
 */
export const getExamList = async (
    params?: {
        pageNum?: number
        length?: number
        paperName?: string
    },
    options?: ExAxiosRequestConfig,
) => {
    return http.post<Result<PageResponse<ExamPaperVO[]>>>('/exam/question/getExamPaperPageList', params, options)
}
