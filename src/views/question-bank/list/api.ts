import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface QuestionVO {
    /** ID */
    id: string
    /** 题目 */
    title: string
    /** 选项1 */
    option1: string
    /** 选项2 */
    option2: string
    /** 选项3 */
    option3: string
    /** 选项4 */
    option4: string
    /** 选项5 */
    option5: string
    /** 选项6 */
    option6: string
    /** 判断题答案文本 */
    text: string | null
    /** 答案 */
    answer: string
    /** 题目类型 0单选 1多选 2判断 */
    type: string
    /** 题目类型名称 */
    type_name: string | null
    /** 是否删除 0否 1是 */
    is_del: string
    /** 删除时间 */
    del_time: string | null
    /** 创建时间 */
    posttime: string | null
    /** 案例标记 */
    case_flag: string
    /** 案例ID */
    caseid: string
    /** 所属大类 */
    kind: string
    /** 分类名称 */
    className: string | null
    /** 所属大类名称 */
    kind_name: string
    /** 所属分类 */
    case_name: string
    /** 类型条件 */
    types: string
}

/**
 * 获取题库列表
 * @param data 查询参数
 * @param options 请求配置
 */
export function list(
    data?: {
        /** 题目 */ title?: string
        /** 所属大类 */ kind?: string
        /** 题目类型 */ type?: string
        /** 页码 */ page?: number
        /** 每页条数 */ pageSize?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<QuestionVO[]>>>({
        url: '/question-bank/list',
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
