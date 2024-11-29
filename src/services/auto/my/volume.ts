import { Dictionary as DictionaryFront } from '../_dict'
/**
 * @file API：/my/volume
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 描述：获取我的卷宗列表
根据查询条件分页获取当前用户的卷宗列表信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author zhengqiang
 */
export function list(data?: {
params?: {[key: string]: string}, 
/** 分页页码 */ pageNum?: number, 
/** 分页长度 */ length?: number, 
/** 查询类型(1:按用户查询,2:按部门查询) */ queryType?: string, 
/** 卷宗类型 */ volumeType?: string, 
/** 卷宗名称，支持模糊查询 */ volumeName?: string, 
/** 对象，同当事人字段，支持模糊查询 */ volumeObject?: string, 
/** 归档号，支持模糊查询 */ archiveNumber?: string, 
/** 申请状态
选项：全部、待审批、审批通过、审批退回 */ applyStatus?: string, 
/** 承办人ID，后端使用，不需要前端传递 */ handlerId?: string, 
/** 机构编码，后端使用，不需要前端传递 */ orgCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<ArchiveVolumeVO>>>({
        url: "/my/volume/list",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：创建卷宗封面
保存卷宗记录信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author zhengqiang
 */
export function saveVolumeCover(data?: {
/** 卷宗配置主键，必须 */ volumeConfigId: string, 
/** 案件主键标识，必须 */ caseId: string, 
/** 卷宗编号，必须 */ volumeNumber: string, 
/** 案件名称 */ caseName?: string, 
/** 案发地址，最多100个字符 */ caseAddress?: string, 
/** 处罚结果 */ punishmentResult?: string, 
/** 承办人 */ handler?: string, 
/** 立案时间
格式：yyyy-MM-dd */ filingTime?: string, 
/** 结案时间
格式：yyyy-MM-dd */ closingTime?: string, 
/** 保管期限，必须，选项：10年、30年、永久 */ retentionPeriod: string, 
/** 归档号，必须，默认同案件编号 */ archiveNumber: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ArchiveVolumeRecord>>({
        url: "/my/volume/saveVolumeCover",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：获取卷宗文书目录列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author zhengqiang
 */
export function documentList(data?: {
/** 卷宗记录id，必须 */ volumeRecordId: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ArchiveVolumeDocumentVO>>({
        url: "/my/volume/documentList",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：批量计算文书页码
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author zhengqiang
 */
export function calculatePageNumbers(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<DocumentVO[]>>({
        url: "/my/volume/calculatePageNumbers",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：提交卷宗目录
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author zhengqiang
 */
export function submitDocument(data?: {
/** 卷宗记录id，必须 */ id: string, 
/** 正卷目录列表 */ mainVolumeList?: DocumentVO[], 
/** 副卷目录列表 */ subVolumeList?: DocumentVO[], 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ArchiveVolumeSubmitVO>>({
        url: "/my/volume/submitDocument",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：修改卷宗封面
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author zhengqiang
 */
export function modifyVolumeCover(data?: {
/** 卷宗记录id，必须 */ id: string, 
/** 卷宗编号，必须 */ volumeNumber: string, 
/** 案件名称 */ caseName?: string, 
/** 案发地址，最多100个字符 */ caseAddress?: string, 
/** 处罚结果 */ punishmentResult?: string, 
/** 承办人 */ handler?: string, 
/** 立案时间
格式：yyyy-MM-dd */ filingTime?: string, 
/** 结案时间
格式：yyyy-MM-dd */ closingTime?: string, 
/** 保管期限，必须，选项：10年、30年、永久 */ retentionPeriod: string, 
/** 归档号，必须，默认同案件编号 */ archiveNumber: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ArchiveVolumeModifyVO>>({
        url: "/my/volume/modifyVolumeCover",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 卷宗整理封面保存
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function firstSave(data?: {
/** 主键 */ id: string, 
/** 案卷名称 */ caseName?: string, 
/** 案发地址 */ caseAddress?: string, 
/** 处罚结果 */ punishmentResult?: string, 
/** 承办人 */ handler?: string, 
/** 立案时间 */ filingTime?: string, 
/** 结案时间 */ closingTime?: string, 
/** 保管期限 */ retentionPeriod?: string, 
/** 归档号 */ archiveNumber?: string, 
/** 全宗号 */ fondNumber?: string, 
/** 目录号 */ catalogNumber?: string, 
/** 案卷号 */ caseFileNumber?: string, 
/** 案卷页数 */ pageDesc?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: "/my/volume/firstSave",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 卷宗整理卷内备考表保存
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function nextSave(data?: {
/** 主键 */ id: string, 
/** 情况说明 */ arrangeDesc?: string, 
/** 立卷人 */ archivingUserName?: string, 
/** 立卷时间 */ archivingTime?: string, 
/** 检查人 */ checkerName?: string, 
/** 检查时间 */ checkTime?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: "/my/volume/nextSave",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 在线选择案件文书及证据列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function selectVolumeDocumentList(data?: {
/** 卷宗记录id */ volumeRecordId: string, 
/** 卷宗类型(1:正卷,2:副卷) */ volumeType: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<DocumentStageVO[]>>({
        url: "/my/volume/selectVolumeDocumentList",
        type: "POST",
        data,
        ...options
    })
}

/** 枚举 - 查询类型 */
export enum Cxlx {
    /** 按用户查询 */
    AYHCX = '1',
    /** 按部门查询 */
    ABMCX = '2',
}
/** 枚举对象 - 查询类型 */
export const CxlxObj = { 
    [Cxlx.AYHCX]: { label: '按用户查询', value: Cxlx.AYHCX },
    [Cxlx.ABMCX]: { label: '按部门查询', value: Cxlx.ABMCX },
}

/** 枚举 - 卷宗类型 */
export enum Jzlx {
    /** 正卷 */
    ZJ = '1',
    /** 副卷 */
    FJ = '2',
}
/** 枚举对象 - 卷宗类型 */
export const JzlxObj = { 
    [Jzlx.ZJ]: { label: '正卷', value: Jzlx.ZJ },
    [Jzlx.FJ]: { label: '副卷', value: Jzlx.FJ },
}



export const Dict = new DictionaryFront({
    /**枚举数组 - 查询类型 */
    Cxlx: {
        options: [
            { label: '按用户查询', value: Cxlx.AYHCX },
            { label: '按部门查询', value: Cxlx.ABMCX },
        ]
    },
    /**枚举数组 - 卷宗类型 */
    Jzlx: {
        options: [
            { label: '正卷', value: Jzlx.ZJ },
            { label: '副卷', value: Jzlx.FJ },
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

export interface PageResponse<T> {

    /**
     * 表头数组
     */
    tableHeadArray: string[]

    /**
     * 过滤后的记录数
     */
    recordsFiltered: string

    /**
     * 返回的分页数据对象
     */
    data: T[]

    /**
     * 请求次数计数器
     */
    draw: number

    /**
     * 错误提示信息
     */
    error: string

    /**
     * 总记录数
     */
    recordsTotal: string

    /**
     * 表头
     */
    tableHead: any

}

export interface ArchiveVolumeVO {

    /**
     * 对象
     */
    volumeObject: string

    /**
     * 卷宗类型
     */
    volumeType: string

    /**
     * 卷宗URL地址
     */
    volumeUrl: string

    /**
     * 编号
     */
    volumeNumber: string

    /**
     * 卷宗名称
     */
    volumeName: string

    /**
     * 归档日期
格式：yyyy-MM-dd
     */
    archiveDate: string

    /**
     * 更新时间
格式：yyyy-MM-dd HH:mm:ss
     */
    updateTime: string

    /**
     * 主键
     */
    id: string

    /**
     * 卷宗类型编码
     */
    volumeTypeCode: string

    /**
     * 归档号
     */
    archiveNumber: string

    /**
     * 申请状态
     */
    applyStatus: string

}

export interface ArchiveVolumeRecord {

    /**
     * 整理人id
     */
    arrangeUserId: string

    /**
     * 承办人
     */
    handler: string

    /**
     * 卷宗修改描述
     */
    modifyDesc: string

    /**
     * 创建人id
     */
    creatorId: string

    /**
     * 创建人姓名
     */
    creatorName: string

    /**
     * 备注
     */
    remark: string

    /**
     * 卷宗类型编码
     */
    volumeTypeCode: string

    /**
     * 整理状态(1:未整理,2:已整理)
     */
    arrangeStatus: string

    /**
     * 立卷人id
     */
    archivingUserId: string

    /**
     * 案发地址
     */
    caseAddress: string

    /**
     * 卷宗类型名称
     */
    volumeTypeName: string

    /**
     * 卷宗URL地址
     */
    volumeUrl: string

    /**
     * 目录号
     */
    catalogNumber: string

    /**
     * 处罚结果
     */
    punishmentResult: string

    /**
     * 结案时间
     */
    closingTime: string

    /**
     * 整理人姓名
     */
    arrangeUserName: string

    /**
     * 更新人id
     */
    updaterId: string

    /**
     * 案卷编号
     */
    caseNumber: string

    /**
     * 执法机构编码
     */
    orgCode: string

    /**
     * 整理时间
     */
    arrangeTime: string

    /**
     * 案件id
     */
    caseId: string

    /**
     * 案件名称
     */
    caseName: string

    /**
     * 卷宗状态(1:有效,0:无效,9:暂存)
     */
    volumeStatus: string

    /**
     * 整理情况说明
     */
    arrangeDesc: string

    /**
     * 主键
     */
    id: string

    /**
     * 归档号
     */
    archiveNumber: string

    /**
     * 保管期限(10年/30年/永久)
     */
    retentionPeriod: string

    /**
     * 案卷号
     */
    caseFileNumber: string

    /**
     * 执法机构名称
     */
    orgName: string

    /**
     * 立卷人姓名
     */
    archivingUserName: string

    /**
     * 更新时间（归档时间）
     */
    updateTime: string

    /**
     * 立案时间
     */
    filingTime: string

    /**
     * 页数描述
     */
    pageDesc: string

    /**
     * 检查时间
     */
    checkTime: string

    /**
     * 全宗号
     */
    fondNumber: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 卷宗名称
     */
    volumeName: string

    /**
     * 立卷时间
     */
    archivingTime: string

    /**
     * 更新人姓名
     */
    updaterName: string

    /**
     * 对象名称
     */
    objectName: string

    /**
     * 检查人id
     */
    checkerId: string

    /**
     * 卷宗配置唯一标识
     */
    volumeConfigId: string

    /**
     * 检查人姓名
     */
    checkerName: string

}

export interface DocumentVO {

    /**
     * 文号
     */
    documentCode: string

    /**
     * 序号
     */
    serialNumber: number

    /**
     * 页码
     */
    pageNumber: string

    /**
     * 案件阶段编码
     */
    caseStageCode: string

    /**
     * 案件阶段名称
     */
    caseStageName: string

    /**
     * 文书类型(1:文书,2:附件材料)
     */
    documentType: string

    /**
     * 文书/附件URL地址
     */
    documentUrl: string

    /**
     * 文书目录编码
     */
    catalogCode: string

    /**
     * 文书id/附件id
     */
    documentId: string

    /**
     * 文书/附件名称
     */
    documentName: string

}

export interface ArchiveVolumeDocumentVO {

    /**
     * 正卷目录列表
     */
    mainVolumeList: DocumentVO[]

    /**
     * 副卷目录列表
     */
    subVolumeList: DocumentVO[]

}

export interface ArchiveVolumeSubmitVO {

    /**
     * 卷宗URL地址
     */
    volumeUrl: string

    /**
     * 卷宗记录id
     */
    id: string

}

export interface ArchiveVolumeModifyVO {

    /**
     * 卷宗配置主键
     */
    volumeConfigId: string

    /**
     * 卷宗记录id
     */
    id: string

    /**
     * 案件主键标识
     */
    caseId: string

}

export interface DocumentStageVO {

    /**
     * 案件阶段编码
     */
    caseStageCode: string

    /**
     * 案件阶段名称
     */
    caseStageName: string

    /**
     * 文书列表
     */
    documentList: DocumentVO[]

}

