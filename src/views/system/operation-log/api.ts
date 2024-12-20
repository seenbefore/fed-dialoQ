import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result, PageResponse } from '@/@types'
import { OperationTypeEnum, OperationStatusEnum, OperationModuleEnum } from './enum'

export interface OperationLogVO {
    /** ID */
    id: string
    /** 操作人 */
    operator: string
    /** 操作类型 */
    operationType: OperationTypeEnum
    /** 操作描述 */
    description: string
    /** 操作模块 */
    module: OperationModuleEnum
    /** 操作状态 */
    status: OperationStatusEnum
    /** 操作IP */
    ip: string
    /** 操作时间 */
    operationTime: string
    /** 请求地址 */
    requestUrl: string
    /** 请求方式 */
    requestMethod: string
    /** 请求参数 */
    requestParams: string
    /** 响应结果 */
    responseResult: string
    /** 异常信息 */
    errorMessage: string
}

/**
 * 获取操作日志列表
 */
export function list(
    data?: {
        /** 操作人 */ operator?: string
        /** 操作类型 */ operationType?: OperationTypeEnum
        /** 操作时间开始 */ operationTimeStart?: string
        /** 操作时间结束 */ operationTimeEnd?: string
        /** 操作状态 */ status?: OperationStatusEnum
        /** 操作模块 */ module?: OperationModuleEnum
        /** 页码 */ page?: number
        /** 每页条数 */ pageSize?: number
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<PageResponse<OperationLogVO[]>>>({
        url: '/system/operation-log/list',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取操作日志详情
 */
export function detail(
    data?: {
        /** id */ id: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<OperationLogVO>>({
        url: '/system/operation-log/detail',
        method: 'get',
        params: data,
        ...options,
    })
}
