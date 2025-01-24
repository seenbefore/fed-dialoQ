import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

/** 题目选项 */
export interface QuestionOption {
    /** 选项代码 */
    code: string
    /** 选项内容 */
    content: string
}

/** 题目数据 */
export interface QuestionVO {
    /** ID */
    id?: string
    /** 所属大类代码 */
    categoryCode: string
    /** 所属大类名称 */
    categoryName: string
    /** 所属分类代码 */
    subCategoryCode: string
    /** 所属分类名称 */
    subCategoryName: string
    /** 题目类型代码 */
    questionTypeCode: string
    /** 题目类型名称 */
    questionTypeName: string
    /** 题目内容 */
    questionContent: string
    /** 题目选项 JSON字符串 */
    questionOptions: string
    /** 正确答案 */
    correctAnswer: string
}

/**
 * 获取题库列表
 * @param data 查询参数
 * @param options 请求配置
 */
export function list(
    data?: {
        /** 题目关键字 */ questionContent?: string
        /** 所属大类代码 */ categoryCode?: string
        /** 所属分类代码 */ subCategoryCode?: string
        /** 题目类型代码 */ questionTypeCode?: string
        /** 页码 */ pageNum?: number
        /** 每页条数 */ length?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<{ total: string; pages: number; data: QuestionVO[] }>>({
        url: '/exam/question/getExamQuestionPageList',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 保存题目
 * @param data 题目数据
 * @param options 请求配置
 */
export function save(data: QuestionVO, options?: ExAxiosRequestConfig) {
    const url = data.id ? '/exam/question/editExamQuestion' : '/exam/question/saveExamQuestion'
    return http.request<Result<void>>({
        url,
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除题目
 * @param data 题目ID
 * @param options 请求配置
 */
export function remove(data: { questionId: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/exam/question/removeQuestion',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 获取题目详情
 * @param data 题目ID
 * @param options 请求配置
 */
export function detail(data: { id: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<QuestionVO>>({
        url: '/question-bank/detail',
        method: 'get',
        params: data,
        ...options,
    })
}
