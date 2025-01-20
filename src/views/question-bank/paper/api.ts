import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface ExamPaperVO {
    /** 数据唯一ID */
    id: string
    /** 考卷名称 */
    paperName: string
    /** 考卷描述 */
    paperDesc: string
    /** 考卷总题数 */
    totalQuestions: number
    /** 多选题目数 */
    multipleChoiceCount: number
    /** 单选题目数 */
    singleChoiceCount: number
    /** 判断题目数 */
    judgeCount: number
    /** 创建人id */
    creatorId: string
    /** 创建人姓名 */
    creatorName: string
    /** 更新时间 */
    updateTime: string
    /** 备注 */
    remark: string
    /** 考卷总分 */
    totalScore: number
    /** 考卷及格分 */
    passScore: number
    /** 考试时长(分钟) */
    duration: number
    /** 考卷类型代码 */
    paperTypeCode: string
    /** 考卷类型名称 */
    paperTypeName: string
    /** 创建时间 */
    createTime: string
    /** 单选题分数 */
    singleChoiceScore: number
    /** 多选题分数 */
    multipleChoiceScore: number
    /** 判断题分数 */
    judgeScore: number
    /** 考试开始时间 */
    startTime: string
    /** 考试结束时间 */
    endTime: string
    /** 考卷状态(1:正常,0:删除) */
    status: string
}

/** 考卷辅助信息 */
export interface ExamPaperDetailDTO {
    /** 题目数量 */
    questionCount: number
    /** 题目类型名称 */
    questionTypeName: string
    /** 题目类型代码 */
    questionTypeCode: string
    /** 题目分类代码 */
    subCategoryCode: string
    /** 题目大类代码 */
    categoryCode: string
    /** 题目大类名称 */
    categoryName: string
    /** 题目分类名称 */
    subCategoryName: string
}

export interface PaperDetailVO {
    categoryCode: string
    categoryName: string
    subCategoryCode: string
    subCategoryName: string
    questionTypeCode: string
    questionTypeName: string
    questionCount: number
}

export interface ExamPaperBaseVO {
    paperName: string
    paperTypeCode: string
    paperTypeName: string
    duration: number
    totalQuestions: number
    totalScore: number
    passScore: number
    singleChoiceScore: number
    multipleChoiceScore: number
    judgeScore: number
    startTime: string
    endTime: string
    paperDetails: PaperDetailVO[]
    details: PaperDetailVO[]
}

export interface ExamPaperConfigVO extends ExamPaperBaseVO {
    id: string
}

export interface ExamPaperUpdateDTO extends ExamPaperBaseVO {
    id?: string
}

export interface QuestionOption {
    code: string
    content: string
}

export interface Question {
    id: string
    questionContent: string
    questionOptions: string
    correctAnswer: string
}

export interface PaperPreviewVO {
    paperDesc: string
    totalQuestions: number
    multipleChoiceCount: number
    singleChoiceCount: number
    multipleChoiceQuestions: Question[]
    judgeQuestions: Question[]
    totalScore: number
    passScore: number
    singleChoiceQuestions: Question[]
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

/**
 * 获取试卷配置
 */
export function getConfig(data: { id: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<ExamPaperConfigVO>>({
        url: '/exam/question/getExamPaperConfig',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 获取考卷分页列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(
    data?: {
        /** 分页页码 */ pageNum?: number
        /** 分页长度 */ length?: number
        /** 考卷名称关键字 */ paperName?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<ExamPaperVO[]>>>({
        url: '/exam/question/getExamPaperPageList',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 保存试卷配置
 */
export function save(data: ExamPaperUpdateDTO, options?: ExAxiosRequestConfig) {
    return http.request<Result<void>>({
        url: '/exam/paper/save',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取试卷预览详情
 * @param id 试卷ID
 * @param options 附加选项
 */
export function getExamPaperPreview(id: string, options?: ExAxiosRequestConfig) {
    return http.request<Result<PaperPreviewVO>>({
        url: '/exam/question/getExamPaperPreview',
        method: 'GET',
        params: { id },
        ...options,
    })
}
