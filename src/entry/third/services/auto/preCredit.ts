/**
 * @file API：/preCredit
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 查询前置授信
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function getPreCredit(data?: {
/** 前置授信id */ reportId?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<PreCreditVo>>({
        url: "/preCredit/getPreCredit",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 更新前置征信
Tips: 更新前置征信-关联人,系统会根据授权前置状态自动判断仅更新关联人,还是更新关联人后批量查询前置征信
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function update(data?: {
/** 报告id */ reportId: string, 
/** 关联人 */ creditRelatePeoples?: PreCreditDto$CreditRelatePeople[], 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<boolean>>({
        url: "/preCredit/update",
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

export interface PreCreditVo$CreditRelatePeople {

    /**
     * 关联人名称
     */
    relateName: string

    /**
     * 证件号(企业unicode/个人身份证号)
     */
    uid: string

    /**
     * 数据来源: 0-系统(数据组或第三方),1-手动输入
     */
    dataFromType: number

    /**
     * 关联角色-字典名
     */
    relateRoleLabelName: string

    /**
     * 关联关系-字典名
     */
    relationLabelName: string

    /**
     * 授权状态
     */
    authStatus: number

    /**
     * 关联角色,字典: pre_credit_relate_role
     */
    relateRole: string

    /**
     * 关联人类型: 1-企业, 2-个人
     */
    relateType: number

    /**
     * 关联关系,字典: pre_credit_relate
     */
    relation: string

}

export interface PreCreditVo {

    /**
     * 关联人
     */
    creditRelatePeoples: PreCreditVo$CreditRelatePeople[]

    /**
     * 报告id
     */
    reportId: string

    /**
     * 查询批次号
     */
    queryNo: string

}

export interface PreCreditDto$CreditRelatePeople {

    /**
     * 关联人名称
     */
    relateName: string

    /**
     * 证件号(企业unicode/个人身份证号)
     */
    uid: string

    /**
     * 数据来源: 0-系统(数据组或第三方),1-手动输入
     */
    dataFromType: number

    /**
     * 关联角色,字典: pre_credit_relate_role
     */
    relateRole: string

    /**
     * 关联人类型: 1-企业, 2-个人
     */
    relateType: number

    /**
     * 关联关系,字典: pre_credit_relate
     */
    relation: string

}

