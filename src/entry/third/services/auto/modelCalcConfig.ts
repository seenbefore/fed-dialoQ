/**
 * @file API：/modelCalcConfig
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 添加/更新计算模型配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function addOrUpdate(data?: {
/** 模型主键Id */ modelId: string, 
/** 启用状态: 0-禁用,1-启用 */ using: number, 
/** 模型关联结果 */ relationGroups?: ModelCalcConfigDto$ResultGroup[], 
/** 模型结果(带条件) */ conditionGroups?: ModelCalcConfigDto$ResultGroup[], 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result>({
        url: "/modelCalcConfig/addOrUpdate",
        type: "post",
        data,
        ...options
    })
}

/**
 * 查询计算模型配置详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function detail(data?: {
/** 计算模型Id */ id?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result_1<ModelCalcConfigDto>>({
        url: "/modelCalcConfig/detail",
        type: "GET",
        data,
        ...options
    })
}

export interface ModelCalcConfigDto$ResultIndexItemValue {

    /**
     * 值
Tips:
 valueType = 0, 符号/函数,比如 (、+ 、-、*、/、max、min等
 valueType = 1, 数值,比如 123
 valueType = 2, 一般指标字段代码,比如 hx2506
 valueType = 3, 结果指标字段代码,比如 WL782
 valueType = 4, 一般指标字段代码,比如 dsfjsdfredfd
     */
    value: string

    /**
     * 指标名称
Tips: 当valueType是指标(一般/结果/模型指标)时,对应的指标名称
     */
    indexName: string

    /**
     * 值类型: 0-符号/函数(最大值,最小值), 1-数值, 2-一般指标, 3-结果指标, 4-模型指标
     */
    valueType: number

}

export interface ModelCalcConfigDto$ResultIndexItem {

    /**
     * 指标类型: 0-结果指标
     */
    indexType: number

    /**
     * 模型指标-结果指标-字段名称
     */
    indexName: string

    /**
     * 值类型: 1-数值, 2-公式, 3-指标
     */
    valueType: number

    /**
     * 模型指标-结果指标-字段代码
     */
    indexCode: string

    /**
     * 指标项-值配置
     */
    resultItemValues: ModelCalcConfigDto$ResultIndexItemValue[]

    /**
     * 运算符: "="
     */
    operator: string

}

export interface ModelCalcConfigDto$Condition {

    /**
     * 比较值
     */
    compareValue: string

    /**
     * 指标类型: 0-结果指标, 1-一般指标, 2-模型指标
     */
    indexType: number

    /**
     * 比较值类型: 1-数值, 2-一般指标, 3-结果指标, 4-模型指标
     */
    compareType: number

    /**
     * 模型指标-结果指标字段名称
     */
    indexName: string

    /**
     * 模型指标-结果指标字段代码
     */
    indexCode: string

    /**
     * 逻辑判断符: eq-等于, ne-不等于, lt-小于, le-小于等于, gt-大于, ge-大于等于
     */
    logic: string

    /**
     * label(仅前端)
     */
    compareLabel: string

}

export interface ModelCalcConfigDto$ResultGroup {

    /**
     * 指标类型: -1-未指定, 0-结果指标
     */
    indexType: number

    /**
     * 计算方式: max-最大值, min-最小值, sum-求和, avg-平均值
     */
    operate: string

    /**
     * 结果指标组合-指标项
     */
    resultItems: ModelCalcConfigDto$ResultIndexItem[]

    /**
     * 模型指标-结果指标-字段名称
     */
    indexName: string

    /**
     * 模型指标-结果指标-字段代码
     */
    indexCode: string

    /**
     * 条件判断方式: OR-任一满足,AND-全部满足
Tips: 限可配置前提条件的模型结果
     */
    conditionType: string

    /**
     * 取值条件
Tips: 限可配置前提条件的模型结果
     */
    conditions: ModelCalcConfigDto$Condition[]

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

export interface Result {

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

export interface Result_1<T> {

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

export interface ModelCalcConfigDto {

    /**
     * 模型结果(带条件)
     */
    conditionGroups: ModelCalcConfigDto$ResultGroup[]

    /**
     * 启用状态: 0-禁用,1-启用
     */
    using: number

    /**
     * 模型关联结果
     */
    relationGroups: ModelCalcConfigDto$ResultGroup[]

    /**
     * 模型主键Id
     */
    modelId: string

}

