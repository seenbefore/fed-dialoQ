import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface QuestionVO {
    /** ID */
    id: string
    /** 题目内容 */
    questionContent: string
    /** 创建人id */
    creatorId: string
    /** 创建人姓名 */
    creatorName: string
    /** 所属分类代码 */
    subCategoryCode: string
    /** 所属分类名称 */
    subCategoryName: string
    /** 更新时间 */
    updateTime: string
    /** 备注 */
    remark: string
    /** 所属大类代码 */
    categoryCode: string
    /** 所属大类名称 */
    categoryName: string
    /** 题目类型代码 */
    questionTypeCode: string
    /** 题目类型名称 */
    questionTypeName: string
    /** 创建时间 */
    createTime: string
    /** 题目答案(json格式) */
    questionOptions: string
    /** 题目正确答案 */
    correctAnswer: string
    /** 状态(1:正常,0:删除) */
    status: string
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
export function save(data: Partial<QuestionVO>, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/question-bank/save',
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
export function remove(data: { id: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/question-bank/delete',
        method: 'post',
        data,
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
