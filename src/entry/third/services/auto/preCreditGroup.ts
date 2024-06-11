/**
 * @file API：/preCreditGroup
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 补充身份证号信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function replenishIdCard(data?: {
/** 主体类型: 1-pripid, 2-前置授信id */ subjectType: number, 
/** 企业pripid
Tips: subjectType=1时,需传此参数 */ pripid?: string, 
/** 前置授信id
Tips: subjectType=2时,需传此参数 */ reportId?: string, 
/** 补充的身份证号 */ personInfos?: PrePersonInfoVo[], 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<boolean>>({
        url: "/preCreditGroup/replenishIdCard",
        type: "POST",
        data,
        ...options
    })
}

export interface PrePersonInfoVo {

    /**
     * 姓名
     */
    name: string

    /**
     * 唯一标识
     */
    uid: string

    /**
     * 身份角色: legal-法人, legal_sps-法人配偶, real-实际控制人, real_sps-实际控制人配偶, inv-股东, other-其他, guarantee-担保人, guarantee_relate-连带担保人, together_repay-共还人
     */
    roleType: string

    /**
     * 身份证号
     */
    idCard: string

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

