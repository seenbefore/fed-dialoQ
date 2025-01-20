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

/** 考卷更新参数 */
export interface ExamPaperUpdateDTO {
    /** 考卷ID */
    id?: string
    /** 考卷名称 */
    paperName: string
    /** 考卷描述 */
    paperDesc?: string
    /** 考卷类型代码 */
    paperTypeCode: string
    /** 考卷类型名称 */
    paperTypeName: string
    /** 考试时长(分钟) */
    duration: number
    /** 考卷总题数 */
    totalQuestions: number
    /** 考卷总分 */
    totalScore: number
    /** 考卷及格分 */
    passScore: number
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
    /** 考卷辅助信息列表 */
    paperDetails: ExamPaperDetailDTO[]
}

/** 考题信息 */
export interface QuestionVO {
    /** 题目ID */
    id: string
    /** 题目 */
    questionContent: string
    /** 题目答案 */
    questionOptions: string
    /** 题目正确答案 */
    correctAnswer: string
}

/** 考卷预览信息 */
export interface ExamPaperPreviewVO {
    /** 考卷ID */
    id: string
    /** 考卷名称 */
    paperName: string
    /** 考卷描述 */
    paperDesc: string
    /** 考卷类型代码 */
    paperTypeCode: string
    /** 考卷类型名称 */
    paperTypeName: string
    /** 考试时长(分钟) */
    duration: number
    /** 考卷总题数 */
    totalQuestions: number
    /** 考卷总分 */
    totalScore: number
    /** 考卷及格分 */
    passScore: number
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
    /** 单选题目数 */
    singleChoiceCount: number
    /** 多选题目数 */
    multipleChoiceCount: number
    /** 判断题目数 */
    judgeCount: number
    /** 单选题集合 */
    singleChoiceQuestions: QuestionVO[]
    /** 多选题集合 */
    multipleChoiceQuestions: QuestionVO[]
    /** 判断题集合 */
    judgeQuestions: QuestionVO[]
}

/** 考卷配置信息 */
export interface ExamPaperConfigVO {
    /** 考卷总题数 */
    totalQuestions: number
    /** 考卷总分 */
    totalScore: number
    /** 考卷及格分 */
    passScore: number
    /** 考试时长(分钟) */
    duration: number
    /** 考卷类型代码 */
    paperTypeCode: string
    /** 考卷名称 */
    paperName: string
    /** 单选题分数 */
    singleChoiceScore: number
    /** 多选题分数 */
    multipleChoiceScore: number
    /** 考卷类型名称 */
    paperTypeName: string
    /** 考试开始时间 */
    startTime: string
    /** 考卷辅助信息列表 */
    details: Array<{
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
    }>
    /** 考卷ID */
    id: string
    /** 判断题分数 */
    judgeScore: number
    /** 考试结束时间 */
    endTime: string
}

/**
 * 获取考卷配置信息详情
 * @param data
 * @param options 附加选项
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
 * 更新考卷
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data: ExamPaperUpdateDTO, options?: ExAxiosRequestConfig) {
    const url = data.id ? '/exam/question/editExamPaper' : '/exam/question/saveExamPaper'
    return http.request<Result<void>>({
        url,
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 预览考卷
 * @param id 考卷ID
 * @param options 附加选项
 */
export function preview(id: string, options?: ExAxiosRequestConfig) {
    return http.request<Result<ExamPaperPreviewVO>>({
        url: '/exam/question/getExamPaperPreview',
        method: 'get',
        params: { id },
        ...options,
    })
}
