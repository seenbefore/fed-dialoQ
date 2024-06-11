/**
 * @file API：/ent/query
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 董监高搜索
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function djgPage(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** 搜索关键词-企业名称或者统一信用代码 */ keyWord?: string, 
/** 企业状态（1 存续;3 吊销;4 注销;5 迁出;0 其他）全部不传 */ csState?: string, 
/** 企业成立年限（1 成立1年内 ;2  成立1-3年;3 成立3-5年;4 成立5-10年;5 成立10-15年; 6 成立15年以上）全部不传 */ establishYears?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<EntDjgPageVo>>>({
        url: "/ent/query/djgPage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 董监高搜-主要人员分页查询
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function majorPersonPage(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** pripid */ pripid?: string, 
/** 数据类型 1 当前，0 历史 默认不传查询当前数据，数据源为智慧小微没有历史数据 */ type?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PageResponse<EntMajorPersonPageVo>>>({
        url: "/ent/query/majorPersonPage",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 董监高搜-详情页面数据源
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getDataSourceType(data?: {
/** 查询参数 */ pripid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<string>>({
        url: "/ent/query/getDataSourceType",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 董监高-主要人员数量
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function majorPersonCount(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
/** pripid */ pripid?: string, 
/** 数据类型 1 当前，0 历史 默认不传查询当前数据，数据源为智慧小微没有历史数据 */ type?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<EntMajorPersonCountVo>>({
        url: "/ent/query/majorPersonCount",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 董监高搜-关键人信息（实际控制人）查询 仅限企查查数据源
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function getCrucialPersonList(data?: {
/** 查询参数 */ pripid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<EntKeyPersonVo[]>>({
        url: "/ent/query/getCrucialPersonList",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 董监高搜-最终受益人人员列表查询 仅限企查查数据源
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author chengyayun
 */
export function beneficialPersonList(data?: {
/** 查询参数 */ pripid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<EntBeneficialOwnerVo[]>>({
        url: "/ent/query/beneficialPersonList",
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
     * 总记录数
     */
    total: string

    /**
     * 总页数
     */
    pages: number

    /**
     * 返回的分页数据对象
     */
    data: T[]

}

export interface EntDjgPageVo {

    /**
     * 注册号(CA15)
     */
    regno: string

    /**
     * 科技类企业（1：是；0：否）
     */
    kjlqy: string

    /**
     * 主要人员数量（人行的数据没有历史数据）
     */
    keyPersonCount: number

    /**
     * 本行是否有代发工资（1：是；0：否）
     */
    sfdfgz: string

    /**
     * 本行是否有国结（1：是；0：否）
     */
    sfgj: string

    /**
     * 规上企业（1：是；0：否）
     */
    gsqy: string

    /**
     * 法定代表人
     */
    lerep: string

    /**
     * 本行是否开户（1：是；0：否）
     */
    sfkh: string

    /**
     * 本行黑名单企业（1：是；0：否）
     */
    bhhmdqy: string

    /**
     * 严重失信企业（1：是；0：否）
     */
    yzsxqy: string

    /**
     * 亩产论英雄级别1:A;2:B;3:C;4:D；0：无
     */
    mclyxjb: string

    /**
     * 是否授权 1是，0 否
     */
    ifAuth: string

    /**
     * 本行是否有贷款（1：是；0：否）
     */
    sfdk: string

    /**
     * 成立日期
     */
    estdate: string

    /**
     * pripid
     */
    pripid: string

    /**
     * 登记状态
     */
    regstate: string

    /**
     * 企业(机构)名称
     */
    entname: string

    /**
     * 统一社会信用代码(CA91)
     */
    unicode: string

    /**
     * 联系电话
     */
    tel: string

}

export interface EntMajorPersonPageVo {

    /**
     * pripid
     */
    pripid: string

    /**
     * 出资比例
     */
    subConProp: any

    /**
     * 证件号码
     */
    cerNo: string

    /**
     * 最终受益股份 （智慧小微数据源无值）
     */
    finalBenefitProp: string

    /**
     * 关联企业数（数据源为企查查该字段无值隐藏）
     */
    relateEntNum: number

    /**
     * 数据源 PBC 智慧小微（人行）没有历史数据，QCC 企查查
     */
    dataType: string

    /**
     * 姓名
     */
    name: string

    /**
     * 证件类型
     */
    cerType: string

    /**
     * 职务
     */
    position: string

}

export interface EntMajorPersonCountVo {

    /**
     * 当前主要人员数量
     */
    currentCount: number

    /**
     * 历史主要人员数量（企查查数据源有值）
     */
    historyCount: number

}

export interface EntKeyPersonVo {

    /**
     * pripid
     */
    pripid: string

    /**
     * 持股比例
     */
    subConProp: string

    /**
     * 最终受益股份
     */
    finalBenefitProp: string

    /**
     * 表决权比例
     */
    votingRatio: string

    /**
     * 数据源只有企查查，小微没有这项数据 QCC 企查查
     */
    dataType: string

    /**
     * 姓名
     */
    name: string

}

export interface EntBeneficialOwnerVo {

    /**
     * pripid
     */
    pripid: string

    /**
     * 最终受益股份
     */
    finalBenefitProp: string

    /**
     * 受益类型
     */
    beneficialType: string

    /**
     * 数据源只有企查查，小微没有这项数据 QCC 企查查
     */
    dataType: string

    /**
     * 姓名
     */
    name: string

    /**
     * 任职类型
     */
    position: string

    /**
     * 类型
     */
    personType: string

    /**
     * 判定理由
     */
    judgeReason: string

}

