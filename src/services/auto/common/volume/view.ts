import { Dictionary as DictionaryFront } from '../../_dict'
/**
 * @file API：/common/volume/view
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 描述：申请查看卷宗
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author auto
 */
export function apply(data?: {
/** 卷宗主键 */ volumeId: string, 
/** 申请原因 */ applyReason: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/common/volume/view/apply",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：接收审批结果
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author auto
 */
export function receiveApprovalResult(data?: {
/** 记录id(ArchiveVolumeTemp的id或ArchiveVolumeQuery的id) */ id: string, 
/** 审批类型(1:修改审批,2:查看审批) */ approvalType: string, 
/** 审批状态(2:审批通过,3:审批退回) */ applyStatus: string, 
/** 审批意见 */ approveRemark: string, 
/** 审批人姓名 */ approverName: string, 
/** 审批人id */ approverId: string, 
/** 审批时间 */ approveTime: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/common/volume/view/receiveApprovalResult",
        type: "POST",
        data,
        ...options
    })
}

/** 枚举 - 审批类型 */
export enum Splx {
    /** 修改审批 */
    XGSP = '1',
    /** 查看审批 */
    CKSP = '2',
}
/** 枚举对象 - 审批类型 */
export const SplxObj = { 
    [Splx.XGSP]: { label: '修改审批', value: Splx.XGSP },
    [Splx.CKSP]: { label: '查看审批', value: Splx.CKSP },
}

/** 枚举 - 审批状态 */
export enum Spzt {
    /** 审批通过 */
    SPTG = '2',
    /** 审批退回 */
    SPTH = '3',
}
/** 枚举对象 - 审批状态 */
export const SpztObj = { 
    [Spzt.SPTG]: { label: '审批通过', value: Spzt.SPTG },
    [Spzt.SPTH]: { label: '审批退回', value: Spzt.SPTH },
}



export const Dict = new DictionaryFront({
    /**枚举数组 - 审批类型 */
    Splx: {
        options: [
            { label: '修改审批', value: Splx.XGSP },
            { label: '查看审批', value: Splx.CKSP },
        ]
    },
    /**枚举数组 - 审批状态 */
    Spzt: {
        options: [
            { label: '审批通过', value: Spzt.SPTG },
            { label: '审批退回', value: Spzt.SPTH },
        ]
    },
})

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

