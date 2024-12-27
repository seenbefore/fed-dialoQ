import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

/**
 * 获取考试详情
 */
export const getExamDetail = async (params?: { id: string }, options?: ExAxiosRequestConfig) => {
    // 模拟数据
    return {
        code: 200,
        message: 'success',
        data: {
            id: '20',
            title: '公共营养师20年考题',
            questions: [
                {
                    id: 1,
                    type: 'single', // 单选题
                    title: '以下哪些情况是肌肤敏感的现象?',
                    options: [
                        { label: 'A', value: 'A', text: '角质层薄、易出现红血丝' },
                        { label: 'B', value: 'B', text: '红肿' },
                        { label: 'C', value: 'C', text: '出疹' },
                    ],
                },
                {
                    id: 2,
                    type: 'multiple', // 多选题
                    title: '以下哪些情况是肌肤敏感的现象222?',
                    options: [
                        { label: 'A', value: 'A', text: '角质层薄、易出现红血丝' },
                        { label: 'B', value: 'B', text: '红肿' },
                        { label: 'C', value: 'C', text: '出疹' },
                    ],
                },
                {
                    id: 3,
                    type: 'judge', // 判断题
                    title: '以下哪些情况是肌肤敏感的现象?',
                    options: [
                        { label: 'A', value: 'A', text: '正确' },
                        { label: 'B', value: 'B', text: '错误' },
                    ],
                },
            ],
            duration: 3600, // 考试时长(秒)
        },
    }
}

/**
 * 提交答案
 */
export const submitAnswer = async (
    data: {
        examId: string
        answers: Array<{
            questionId: number
            answer: string
        }>
    },
    options?: ExAxiosRequestConfig,
) => {
    return {
        code: 200,
        message: 'success',
        data: null,
    }
}
