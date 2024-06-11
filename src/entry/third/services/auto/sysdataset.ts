/**
 * @file API：/sysdataset
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * Description
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function add(data?: {
po?: any, 
user?: SysUser, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/sys-data-set/add",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 更新
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function edit(data?: {
po?: any, 
user?: SysUser, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/sys-data-set/edit",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 数据集列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 数据编码 */ dataCode?: string, 
/** 数据名称 */ dataName?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<SysDataSet>>>({
        url: "/sys-data-set/list",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function detail(data?: {
id?: number, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<SysDataSet>>({
        url: "/sys-data-set/detail/{id}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 根据id删除记录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function delete_1(data?: {
id?: number, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1>({
        url: "/sys-data-set/delete/{id}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function transform(data?: {
sourceCode?: string, 
dynSentence?: string, 
setType?: string, 
dataSetParamDtoList?: any[], 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1>({
        url: "/sys-data-set/transform",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getData(data?: {
chartType?: string, 
/** 数据集编码 */ setCode?: string, 
/** 传入的自定义参数需要分页
pageNumber，
pageSize,参数 */ contextData?: {[key: string]: any}, 
/** 图表属性 */ chartProperties?: {[key: string]: string}, 
/** 时间字段 */ timeLineFiled?: string, 
/** 时间颗粒度 */ particles?: string, 
/** 时间格式化 */ dataTimeFormat?: string, 
/** 时间展示层 */ timeLineFormat?: string, 
timeUnit?: number, 
/** 时间区间 */ startTime?: string, 
/** 时间区间 */ endTime?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1>({
        url: "/sys-data-set/getData",
        type: "POST",
        data,
        ...options
    })
}

export interface SysUser {

    /**
     * 在职状态（1：在职  2：离职  3：其他）
     */
    workStatus: string

    userLoginNum: number

    /**
     * 证件类型（1：身份证   2：军官证   3：护照   4：港澳通行证   5：签证   6：其它）
     */
    cernoType: string

    /**
     * 真实姓名
     */
    realName: string

    /**
     * 最后登录时间
     */
    lastLoginTime: string

    /**
     * 登录密码
     */
    password: string

    /**
     * 证件号
     */
    cerno: string

    /**
     * 用工类型（1：正式工   2：临时工   3：其他）
     */
    employeeType: string

    /**
     * 岗位
     */
    post: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 归属机构编码
     */
    organizationCode: string

    /**
     * 联系方式（电话或手机号）
     */
    phone: string

    /**
     * 用户唯一编号
     */
    identity: string

    /**
     * 用户上次修改密码时间
     */
    lastModifyPwdTime: string

    /**
     * 主键
     */
    id: string

    /**
     * 密码盐值
     */
    passwordSalt: string

    /**
     * 电子邮件
     */
    email: string

    /**
     * 登录用户名
     */
    username: string

    /**
     * 用户状态（0：无效  1有效）
     */
    status: string

    /**
     * 用户描述
     */
    desc: string

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
     * 过滤后的记录数
     */
    recordsFiltered: string

    /**
     * 请求次数计数器
     */
    draw: number

    /**
     * 返回的分页数据对象
     */
    data: T[]

    /**
     * 错误提示信息
     */
    error: string

    /**
     * 总记录数
     */
    recordsTotal: string

}

export interface SysDataSet {

    /**
     * 数据集描述
     */
    dataDesc: string

    /**
     * 创建人
     */
    creator: string

    /**
     * 更新人
     */
    modifier: string

    /**
     * 数据集状态 1：启用 0：禁止
     */
    dataStatus: string

    /**
     * 数据集名称
     */
    dataName: string

    /**
     * 创建时间
     */
    cTime: string

    /**
     * 更新时间
     */
    uTime: string

    id: number

    /**
     * 数据集编码
     */
    dataCode: string

    /**
     * 数据集sql
     */
    dynSentence: string

}

export interface Result_1 {

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
    data: any

    /**
     * 错误信息
     */
    errors: ErrorInfo[]

}

