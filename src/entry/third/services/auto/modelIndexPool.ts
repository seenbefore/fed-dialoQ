/**
 * @file API：/modelIndexPool
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 模型指标集-分页查询
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function selectByPage(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 指标字段名称
Tips: 支持模糊查询 */ indexName?: string, 
/** 指标类型: 0-其它,1-行内规则,2-阳光平台规则,3-企查查规则,4-征信报告规则,5-人行规则,6-调查报告 */ indexType?: number, 
/** 所属指标集: 0-结果指标集, 1-一般指标集 */ indexSet?: string, 
/** 是否启用: 0-否, 1-是 */ ifUsing?: number, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<ModelIndexPool>>>({
        url: "/modelIndexPool/selectByPage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 新增/修改指标
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function addOrUpdate(data?: {
/** 主键id
Tips: 新增不存,修改必传 */ id?: string, 
/** 插入时间 */ createTime?: string, 
/** 更新时间 */ updateTime?: string, 
/** 指标类型: 0-其它,1-行内规则,2-阳光平台规则,3-企查查规则,4-征信报告规则,5-人行规则,6-调查报告 */ indexType?: number, 
/** 所属指标集: 0-结果指标集,1-一般指标集 */ indexSet?: string, 
/** 指标字段代码 */ indexCode?: string, 
/** 指标字段名称 */ indexName?: string, 
/** 指标值类型(0:数值型,1：字符型) */ indexValueType?: number, 
/** 指标描述 */ indexDesc?: string, 
/** 是否启用(0:否	1：是) */ ifUsing?: number, 
/** 是否删除(0:否,1：是) */ ifDel?: number, 
/** 是否在测额配置中启用.  1 启用  0 未启用 */ configUsed?: number, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/modelIndexPool/addOrUpdate",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 删除测额模型-指标
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function delete_1(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1>({
        url: "/modelIndexPool/delete",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 查询测额模型-指标详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function selectById(data?: {
/** 指标主键id */ id?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<ModelIndexPool>>({
        url: "/modelIndexPool/selectById",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 一般指标集-指标类型-分组查询
Tips: 响应结果必定有值,没有值的用空数组"[]"占位
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function selectByIndexTypeGroup(data?: {
/** 一般指标集指标名称,支持模糊查询 */ indexName?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<ModelIndexTypeGroupVo[]>>({
        url: "/modelIndexPool/selectByIndexTypeGroup",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 指标查询
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function listAllIndexPools(data?: {
/** 指标类型集,多个用逗号隔开,缺省"0,1,2"(指标类型: 0-结果指标, 1-一般指标, 2-模型指标) */ indexTypes?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<ModelResultIndexVo[]>>({
        url: "/modelIndexPool/listAllIndexPools",
        type: "GET",
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

export interface ModelIndexPool {

    /**
     * 所属指标集: 0-结果指标集,1-一般指标集
     */
    indexSet: string

    /**
     * 指标字段名称
     */
    indexName: string

    /**
     * 指标值类型(0:数值型,1：字符型)
     */
    indexValueType: number

    /**
     * 是否启用(0:否	1：是)
     */
    ifUsing: number

    /**
     * 指标字段代码
     */
    indexCode: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 是否在测额配置中启用.  1 启用  0 未启用
     */
    configUsed: number

    /**
     * 指标类型: 0-其它,1-行内规则,2-阳光平台规则,3-企查查规则,4-征信报告规则,5-人行规则,6-调查报告
     */
    indexType: number

    /**
     * 插入时间
     */
    createTime: string

    /**
     * 指标描述
     */
    indexDesc: string

    /**
     * 是否删除(0:否,1：是)
     */
    ifDel: number

    /**
     * 主键id
Tips: 新增不存,修改必传
     */
    id: string

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

export interface ModelIndexTypeVo {

    /**
     * 指标名称
     */
    name: string

    /**
     * 指标类型
     */
    indexType: number

}

export interface ModelIndexTypeGroupVo {

    /**
     * 模型指标集-一般指标集指标类型
     */
    modelIndexTypeVo: ModelIndexTypeVo

    /**
     * 分组指标集
     */
    indexPools: ModelIndexPool[]

}

export interface ModelResultIndexVo {

    /**
     * 指标代码
     */
    indexCode: string

    /**
     * 指标类型: 0-结果指标, 1-一般指标, 2-模型指标
     */
    indexType: number

    /**
     * 指标名称
     */
    indexName: string

}

