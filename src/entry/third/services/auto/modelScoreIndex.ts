/**
 * @file API：/modelScoreIndex
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 分页查询-评分指标
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
/** 指标名
Tips: 支持模糊查询 */ indexName?: string, 
/** 评分模型Id */ modelId?: string, 
/** 修改日期-起始查询日
Tips: 起始时间 00:00:00 */ startDay?: string, 
/** 修改日期-结束查询日
Tips: 终止时间 23:59:59 */ endDay?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<ModelScoreIndexVo>>>({
        url: "/modelScoreIndex/listOfPage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 删除-评分指标
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function delete_1(data?: {
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<number>>({
        url: "/modelScoreIndex/delete",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 新增/修改-评分指标
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function addOrUpdate(data?: {
/** 评分指标主键Id
Tips: 新增不传,修改必传 */ id?: string, 
/** 取数方式: 1-系统取数,2-手动取数 */ dataSource?: number, 
/** 指标代码-系统取数 */ sysIndexCode?: string, 
/** 指标名称 */ indexName?: string, 
/** 指标代码 */ indexCode?: string, 
/** 评分指标备注 */ remark?: string, 
/** 指标归属的评分维度配置 */ belongClassifies?: ModelScoreIndexConfigDto$BelongClassify[], 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/modelScoreIndex/addOrUpdate",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 评分指标详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function detail(data?: {
/** 评分指标Id */ id?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<ModelScoreIndexConfigDto>>({
        url: "/modelScoreIndex/detail",
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

export interface ModelScoreIndexVo {

    /**
     * 评分模型,用","分割
     */
    modelNameString: string

    /**
     * 评分维度,用","分割
     */
    scoreClassifyNameString: string

    /**
     * 指标名称
     */
    indexName: string

    /**
     * 指标代码
     */
    indexCode: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 评分指标备注
     */
    remark: string

    /**
     * 评分指标主键Id
     */
    id: string

    /**
     * 评分维度名
     */
    scoreClassifyName: string[]

    /**
     * 评分模型名
     */
    modelNames: string[]

}

export interface ModelScoreIndexConfigDto$ValueDetail {

    /**
     * 范围操作: -1 < 以下; 0 = 至;  1 > 以上;
Tips: 范围值专用
     */
    leftAndRightOption: number

    /**
     * 公式配置结果,如: 10*[存贷比]/30
     */
    result: string

    /**
     * 0 = 含, 1 不含
Tips: 范围值专用
     */
    rightEqual: number

    /**
     * 得分
Tips: 范围值专用
     */
    rightSource: string

    /**
     * 0 = 含, 1 不含
Tips: 范围值专用
     */
    leftEqual: number

    /**
     * 得分
Tips: 范围值专用
     */
    leftSource: string

    /**
     * 配置值
Tips:
 1.范围: 范围值预览,比如 2 <= X and X <= 100
     范围值配置 =>  leftEqual = 0,  leftSource = 2 , leftAndRightOption =0, rightEqual = 0, rightSource =100;
 2.单选: 单选配置值
 3.多选: 多选配置值
 4.公式算法: 公式算法配置数组字符串,比如: [{ "type":1,"name":"10"},{"type":2,"name":"*"},{"type":3,"name":"[存贷比]","value":"cundaibiUid"},{"type":"2","name":"/"},{"type":"1","name":30}]
     配置公式含义: 10*[存贷比]/30
     */
    showFormula: string

    /**
     * 得分
Tips: 范围值、单选值、多选值 得分
     */
    checkedSource: string

}

export interface ModelScoreIndexConfigDto$BelongClassify {

    /**
     * 评分指标权重
     */
    weight: string

    /**
     * 评分模型Id
     */
    modelId: string

    /**
     * 指标值详情
     */
    valueDetails: ModelScoreIndexConfigDto$ValueDetail[]

    /**
     * 评分维度Id
     */
    scoreClassifyId: string

    /**
     * 取值方式: 0-范围, 1-单值, 2-多值复选, 3-公式算法
     */
    valueType: number

}

export interface ModelScoreIndexConfigDto {

    /**
     * 指标名称
     */
    indexName: string

    /**
     * 指标代码
     */
    indexCode: string

    /**
     * 评分指标备注
     */
    remark: string

    /**
     * 评分指标主键Id
Tips: 新增不传,修改必传
     */
    id: string

    /**
     * 取数方式: 1-系统取数,2-手动取数
     */
    dataSource: number

    /**
     * 指标归属的评分维度配置
     */
    belongClassifies: ModelScoreIndexConfigDto$BelongClassify[]

    /**
     * 指标代码-系统取数
     */
    sysIndexCode: string

}

