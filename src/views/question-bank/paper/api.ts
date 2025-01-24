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
export function getExamPaperPreview(data: { id: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<PaperPreviewVO>>({
        url: '/exam/question/getExamPaperPreview',
        method: 'GET',
        params: data,
        ...options,
    })
}
/** 答题记录 */
export interface ExamRecordVO {
    /** 单位全称 */
    orgName: string
    /** 考试实际开始时间 */
    actualStartTime: string
    /** 是否实名认证 */
    isVerified: string
    /** 用户身份证号 */
    idCard: string
    /** 用户手机号 */
    mobile: string
    /** 用户姓名 */
    userName: string
    /** 用户ID */
    userId: string
    /** 考试用时 */
    duration: number
    /** 考试得分 */
    score: number
    /** 答题总数 */
    answerCount: number
    /** 操作系统 */
    osInfo: string
    /** 创建时间 */
    createTime: string
    /** 考试实际结束时间 */
    actualEndTime: string
    /** 用户ip */
    userIp: string
    /** 学号 */
    studentNo: string
    /** 考试是否通过 */
    isPass: string
    /** 考卷ID */
    paperId: string
    /** 浏览器 */
    browserInfo: string
    /** 考试状态 */
    status: string
    /** 考试是否完成 */
    isCompleted: string
}
/** 答题详情 */
export interface ExamRecordDetailVO extends ExamRecordVO {
    /** 答题情况集合 */
    answerDetails: {
        /** 题目 */
        questionContent: string
        /** 题目类型名称 */
        questionTypeName: string
        /** 题目用户答案 */
        userAnswer: string
        /** 题目类型代码 */
        questionTypeCode: string
        /** 题目得分 */
        questionScore: number
        /** 题目答案 */
        questionOptions: string
        /** 题目正确答案 */
        correctAnswer: string
        /** 答题是否正确 */
        isCorrect: string
    }[]
}
/**
 * 获取答题情况分页列表
 */
export function getExamRecordPageList(
    data?: {
        /** 分页页码 */ pageNum?: number
        /** 分页长度 */ length?: number
        /** 考卷ID */ paperId: string
        /** 关键字 */ keyword?: string
        /** 更新日期-开始日期 */ startDate?: string
        /** 更新日期-结束日期 */ endDate?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<ExamRecordVO[]>>>({
        url: '/exam/manage/getExamRecordPageList',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取用户答卷详情信息
 */
export function getExamRecordDetail(
    data: {
        /** 考卷ID */ paperId: string
        /** 用户ID */ userId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<ExamRecordDetailVO>>({
        url: '/exam/manage/getExamRecordDetail',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取单场考试的所有用户答卷情况信息列表(用于导出)
 * @param data 请求参数
 * @param options 附加选项
 */
export function getExamRecordExportList(
    data: {
        /** 考卷ID */

        paperId: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<ExamRecordDetailVO[]>>({
        url: '/exam/manage/getExamRecordExportList',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除试卷
 * @param data 试卷ID
 * @param options 请求配置
 */
export function remove(data: { paperId: string }, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/exam/question/removeExamPaper',
        method: 'get',
        params: data,
        ...options,
    })
}
