import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'
import { Result } from '@/@types'

// 题目类型枚举
export enum QuestionType {
    SINGLE = 'single', // 单选题
    MULTIPLE = 'multiple', // 多选题
    JUDGE = 'judge', // 判断题
}

interface QuestionOption {
    code: string
    content: string
}

interface Question {
    /** 题目ID */
    id: string
    /** 题目内容 */
    questionContent: string
    /** 题目选项 */
    questionOptions: string
    /** 正确答案 */
    correctAnswer: string
}

export interface QuestionCategory {
    /** 题目分类代码 */
    subCategoryCode: string
    /** 题目分类名称 */
    subCategoryName: string
    /** 多选题集合 */
    multipleChoiceQuestions: Question[]
    /** 单选题集合 */
    singleChoiceQuestions: Question[]
    /** 判断题集合 */
    judgeQuestions: Question[]
}

/**
 * 获取题目学习列表
 * @param data 请求参数
 * @param options 请求配置
 */
export function getQuestionStudyList(
    data?: {
        /** 题目分类代码 */

        subCategoryCode?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<QuestionCategory[]>>({
        url: '/exam/manage/getQuestionStudyList',
        method: 'get',
        params: data,
        ...options,
    })
}

// 解析题目选项字符串为选项数组
export function parseQuestionOptions(optionsStr: string): QuestionOption[] {
    try {
        return JSON.parse(optionsStr)
    } catch (e) {
        console.error('解析题目选项失败:', e)
        return []
    }
}
