/**
 * @file API：/manage/volume/query
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 分页查询卷宗查询申请记录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(data?: {
/** 分页参数 页码数 默认1 */ pageNum?: number, 
/** 分页参数 每页条数 默认10 */ length?: number, 
/** 对象排序字段 */ orderField?: string, 
/** 对象排序方式 asc,desc */ orderMethod?: string, 
/** 综合监管：查询参数管辖单位过滤 */ deptSearchLikeStr?: string, 
/** 申请人姓名,支持模糊查询 */ applicantName?: string, 
/** 申请人手机号,精确搜索 */ applicantPhone?: string, 
/** 申请开始时间 */ applyStartTime?: string, 
/** 申请结束时间 */ applyEndTime?: string, 
/** 卷宗类型名称,精确搜索 */ volumeTypeName?: string, 
/** 卷宗编号,支持模糊查询 */ volumeNumber?: string, 
/** 审批状态(全部、审批通过、审批退回) */ applyStatus?: string, 
/** 部门编码 */ deptCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<VolumeQueryVO>>>({
        url: "/manage/volume/query/list",
        type: "POST",
        data,
        ...options
    })
}

export interface ErrorInfo {

    /**
     * 错误属性
     */
    field: string

    /**
     * 错误信息
     */
    info: string

}

export interface Result<T> {

    /**
     * 返回编码.200=成功
     */
    code: number

    /**
     * 返回信息
     */
    message: string

    /**
     * 返回数据
     */
    data: T

    /**
     * 错误信息
     */
    errors: ErrorInfo[]

}

export interface PageResponse<T> {

    /**
     * 表头数组
     */
    tableHeadArray: string[]

    /**
     * 过滤后的记录数
     */
    recordsFiltered: string

    /**
     * 返回的分页数据对象
     */
    data: T[]

    /**
     * 请求次数计数器
     */
    draw: number

    /**
     * 错误提示信息
     */
    error: string

    /**
     * 总记录数
     */
    recordsTotal: string

    /**
     * 表头
     */
    tableHead: any

}

export interface VolumeQueryVO {

    /**
     * 归档日期
     */
    archiveTime: string

    /**
     * 卷宗编号
     */
    volumeNumber: string

    /**
     * 申请人姓名
     */
    applicantName: string

    /**
     * 审批人姓名
     */
    approverName: string

    /**
     * 卷宗类型名称
     */
    volumeTypeName: string

    /**
     * 审批意见
     */
    approveRemark: string

    /**
     * 卷宗对象名称
     */
    volumeObjectName: string

    /**
     * 卷宗名称
     */
    volumeName: string

    /**
     * 主键
     */
    id: string

    /**
     * 申请人手机号
     */
    applicantPhone: string

    /**
     * 申请时间
     */
    applyTime: string

    /**
     * 审批时间
     */
    approveTime: string

    /**
     * 申请状态(2:审批通过,3:审批退回)
     */
    applyStatus: string

}

