/**
 * @file API：/modelStrategy
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 分页查询模型策略
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function listOfPage(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 模型类型: 1-计算类模型,2-评分类模型
{@link ModelTypeEnum#getType()} */ modelType?: number, 
/** 模型名称,支持模糊查询 */ name?: string, 
/** 是否启用: 0-否,1-是 */ ifUsing?: number, 
/** 是否应用为模型指标: 0-否,1-是 */ ifModelIndex?: number, 
/** 模型主键Id
Tips: 指定此参数至多返回1条数据 */ id?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<ModelStrategyVo>>>({
        url: "/modelStrategy/listOfPage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 新增/更新模型策略
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function addOrUpdate(data?: {
/** 模型主键Id,编辑时必传 */ id?: string, 
/** 模型编号
Tips: 新增/编辑时勿传,系统指定 */ modelCode?: string, 
/** 模型名称 */ name?: string, 
/** 模型类型: 1-计算类模型,2-评分类模型
{@link ModelTypeEnum#getType()} */ modelType?: number, 
/** 是否应用为模型指标: 0-否,1-是 */ ifModelIndex?: number, 
/** 模型指标名称
Tips: 应用为模型指标必传 */ modelIndexName?: string, 
/** 模型描述信息 */ modelDesc?: string, 
/** 模型分类: 1-测额模型
Tips: 限计算模型 */ classifyType?: number, 
/** 业务类型-字典model_biz_type的1级字典值
Tips: 限计算模型 */ bizCode?: string, 
/** 业务类型-字典model_biz_type的1级字典名
Tips: 限计算模型 */ bizCodeName?: string, 
/** 授信产品-字典model_biz_type的2级字典值
Tips: 限计算模型 */ creditCode?: string, 
/** 授信产品-字典model_biz_type的2级字典名
Tips: 限计算模型 */ creditCodeName?: string, 
/** 评分维度
Tips: 限评分模型 */ scoreClassify?: ModelScoreClassifyDto[], 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/modelStrategy/addOrUpdate",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 切换模型启用/停用状态
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function switchUsingStatus(data?: {
/** 启用状态: 0-禁用,1-启用 */ using: number, 
/** 模型主键id */ ids: string[], 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<number>>({
        url: "/modelStrategy/switchUsingStatus",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 删除模型
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function delete_1(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<number>>({
        url: "/modelStrategy/delete",
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

export interface ModelScoreClassifyDto {

    /**
     * 维度名称
     */
    className: string

    /**
     * 评分维度-主键Id
Tips: 新增不传,修改必传
     */
    id: string

}

export interface ModelStrategyVo {

    /**
     * 是否配置: 0-否,1-是
     */
    ifConfig: number

    /**
     * 业务类型-字典model_biz_type的1级字典值
Tips: 限计算模型
     */
    bizCode: string

    /**
     * 是否启用: 0-否,1-是
     */
    ifUsing: number

    /**
     * 业务类型-字典model_biz_type的1级字典名
Tips: 限计算模型
     */
    bizCodeName: string

    /**
     * 模型分类: 1-测额模型
Tips: 限计算模型
     */
    classifyType: number

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 模型类型: 1-计算类模型,2-评分类模型
{@link ModelTypeEnum#getType()}
     */
    modelType: number

    /**
     * 是否应用为模型指标: 0-否,1-是
     */
    ifModelIndex: number

    /**
     * 是否被应用: 1-被应用, 0-未应用
     */
    configUsed: number

    /**
     * 模型指标名称
Tips: 应用为模型指标必传
     */
    modelIndexName: string

    /**
     * 授信产品-字典model_biz_type的2级字典值
Tips: 限计算模型
     */
    creditCode: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 模型编号
Tips: 新增/编辑时勿传,系统指定
     */
    modelCode: string

    /**
     * 授信产品-字典model_biz_type的2级字典名
Tips: 限计算模型
     */
    creditCodeName: string

    /**
     * 模型名称
     */
    name: string

    /**
     * 模型描述信息
     */
    modelDesc: string

    /**
     * 评分维度
Tips: 限评分模型
     */
    scoreClassify: ModelScoreClassifyDto[]

    /**
     * 模型主键Id,编辑时必传
     */
    id: string

}

