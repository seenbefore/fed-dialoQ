import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

interface ExamResult {
    score: number
    userName: string
    usedTime: string
    totalQuestions: number
}

/**
 * 获取考试结果
 */
export const getExamResult = async (examId: string, options?: ExAxiosRequestConfig) => {
    // 模拟数据
    return {
        code: 200,
        message: 'success',
        data: {
            score: 8,
            userName: '张姗姗',
            usedTime: '0:30:16',
            totalQuestions: 100,
        } as ExamResult,
    }
}
