import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'
import { Result } from '@/@types'

export interface ExamPaperQuestion {
    paperDesc: string
    totalQuestions: number
    multipleChoiceCount: number
    singleChoiceCount: number
    multipleChoiceQuestions: Array<{
        questionContent: string
        questionOptions: string
        id: string
    }>
    judgeQuestions: Array<{
        questionContent: string
        questionOptions: string
        id: string
    }>
    totalScore: number
    passScore: number
    singleChoiceQuestions: Array<{
        questionContent: string
        questionOptions: string
        id: string
    }>
    duration: number
    paperTypeCode: string
    paperName: string
    singleChoiceScore: number
    multipleChoiceScore: number
    paperTypeName: string
    startTime: string
    id: string
    judgeScore: number
    endTime: string
    judgeCount: number
}

export interface ExamSubmitDTO {
    userId: string
    paperId: string
    startTime: string
    endTime: string
    answers: Array<{
        questionId: string
        userAnswer: string
    }>
    duration: number
}

export interface ExamSubmitResult {
    duration: number
    score: number
    isPassed: string
    examStatus: string
    remark: string
    userName: string
    totalAnswered: number
    userId: string
    paperId: string
    isCompleted: string
    remainingTime: number
}

/**
 * 获取考试详情
 */
export const getExamDetail = async (params?: { id: string }, options?: ExAxiosRequestConfig) => {
    return http.get<Result<ExamPaperQuestion>>('/exam/manage/getExamPaperQuestion', { params, ...options })
}

/**
 * 提交答案
 */
export const submitAnswer = async (data: ExamSubmitDTO, options?: ExAxiosRequestConfig) => {
    return http.post<Result<ExamSubmitResult>>('/exam/manage/submitExam', data, options)
}
