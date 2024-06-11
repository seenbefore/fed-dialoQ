/**
 * @file API：/modelScoreClassify
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 评分模型-评分维度-分页查询
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
/** 模型主键Id */ modelId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<ModelScoreClassifyVo>>>({
        url: "/modelScoreClassify/listOfPage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 评分模型-模型指标及权重
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function listScoreIndexWeight(data?: {
/** 模型主键Id */ modelId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<ModelScoreIndexWeightVo[]>>({
        url: "/modelScoreClassify/listScoreIndexWeight",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 新增/修改-评分模型-评分维度
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function addOrUpdate(data?: {
/** 主键id
Tips: 新增不传,修改必传 */ id?: string, 
/** 插入时间 */ createTime?: string, 
/** 更新时间 */ updateTime?: string, 
/** 评分模型Id(mod_model_baseinfo.id) */ modelId?: string, 
/** 评分维度名称 */ className?: string, 
/** 得分上限 */ scoreLimit?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/modelScoreClassify/addOrUpdate",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 删除-评分模型-评分维度
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function delete_1(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<number>>({
        url: "/modelScoreClassify/delete",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 评分模型-评分模型&评分维度列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function listAllModelAndClassify(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<ModelAndScoreClassifyVo[]>>({
        url: "/modelScoreClassify/listAllModelAndClassify",
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

export interface ModelScoreClassifyVo {

    /**
     * 插入时间
     */
    createTime: string

    /**
     * 评分模型Id(mod_model_baseinfo.id)
     */
    modelId: string

    /**
     * 指标数量
     */
    indexCount: number

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 评分维度名称
     */
    className: string

    /**
     * 主键id
Tips: 新增不传,修改必传
     */
    id: string

    /**
     * 得分上限
     */
    scoreLimit: string

}

export interface ModelScoreIndexWeightVo$IndexWeight {

    /**
     * 权重
     */
    weight: string

    /**
     * 指标名
     */
    indexName: string

}

export interface ModelScoreIndexWeightVo {

    /**
     * 维度名称
     */
    className: string

    /**
     * 指标权重
     */
    indexWeights: ModelScoreIndexWeightVo$IndexWeight[]

}

export interface ModelAndScoreClassifyVo$Detail {

    /**
     * 名称
     */
    name: string

    /**
     * 主键Id
     */
    id: string

}

export interface ModelAndScoreClassifyVo {

    /**
     * 模型
     */
    model: ModelAndScoreClassifyVo$Detail

    /**
     * 评分维度
     */
    classifys: ModelAndScoreClassifyVo$Detail[]

}

