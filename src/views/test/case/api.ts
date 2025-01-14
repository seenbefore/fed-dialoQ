import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'

export interface TestCaseVO {
    /** id */
    id: string
    /** 用例名称 */
    name: string
    /** 用例类型 */
    type: string
    /** 优先级 */
    priority: string
    /** 执行状态 */
    status: string
    /** 前置条件 */
    precondition: string
    /** 测试步骤 */
    steps: string
    /** 预期结果 */
    expectedResult: string
    /** 备注 */
    remark: string
    /** 最后执行时间 */
    lastExecuteTime: string
    /** 创建人 */
    createBy: string
    /** 创建时间 */
    createTime: string
}

/**
 * 获取测试用例列表
 */
export function list(
    data?: {
        /** 用例名称 */ name?: string
        /** 用例类型 */ type?: string
        /** 优先级 */ priority?: string
        /** 执行状态 */ status?: string
        /** 创建开始时间 */ createTimeStart?: string
        /** 创建结束时间 */ createTimeEnd?: string
        /** 当前页码 */ pageNum?: number
        /** 每页条数 */ length?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<TestCaseVO[]>>>({
        url: '/test/case/list',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 保存测试用例
 */
export function save(
    data?: {
        /** id */ id?: string
        /** 用例名称 */ name: string
        /** 用例类型 */ type: string
        /** 优先级 */ priority: string
        /** 前置条件 */ precondition?: string
        /** 测试步骤 */ steps: string
        /** 预期结果 */ expectedResult: string
        /** 备注 */ remark?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/test/case/save',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 删除测试用例
 */
export function remove(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/test/case/remove',
        method: 'get',
        params: data,
        ...options,
    })
}

/**
 * 批量删除测试用例
 */
export function removeBatch(
    data?: {
        /** ids */ ids: string[]
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<any>>({
        url: '/test/case/removeBatch',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取测试用例详情
 */
export function detail(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<TestCaseVO>>({
        url: '/test/case/detail',
        method: 'get',
        params: data,
        ...options,
    })
}
