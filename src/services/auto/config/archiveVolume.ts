import { Dictionary as DictionaryFront } from '../_dict'
/**
 * @file API：/config/archiveVolume
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 描述：创建卷宗配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function saveArchiveVolumeConfig(data?: {
/** 条线编码 */ lineCode: string, 
/** 条线名称 */ lineName: string, 
/** 卷宗类型编码 */ volumeTypeCode: string, 
/** 卷宗类型名称 */ volumeTypeName: string, 
/** 卷宗名称 */ volumeName: string, 
/** 是否有正卷(1:是,0:否) */ hasMainVolume: string, 
/** 是否有副卷(1:是,0:否) */ hasSubVolume: string, 
/** 正卷目录数量 */ mainCatalogCount?: number, 
/** 副卷目录数量 */ subCatalogCount?: number, 
/** 正卷目录列表 */ mainCatalogList: ArchiveVolumeCatalogDTO[], 
/** 副卷目录列表 */ subCatalogList?: ArchiveVolumeCatalogDTO[], 
/** 封面二维码显示(1:显示,0:不显示) */ showQrcode: string, 
/** 封面条形码显示(1:显示,0:不显示) */ showBarcode: string, 
/** 拍摄人姓名显示(1:显示,0:不显示) */ showPhotographer: string, 
/** 申请查看卷宗是否审批(1:需要,0:不需要) */ needApproval: string, 
/** 备注 */ remark?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/config/archiveVolume/saveArchiveVolumeConfig",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：查看卷宗配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function getArchiveVolumeConfig(data?: {
/** 主键 */ id?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ArchiveVolumeConfigVO>>({
        url: "/config/archiveVolume/getArchiveVolumeConfig",
        type: "GET",
        data,
        ...options
    })
}

/**
 * 描述：更新卷宗配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function updateArchiveVolumeConfig(data?: {
/** 主键 */ id?: string, 
/** 条线编码 */ lineCode: string, 
/** 条线名称 */ lineName: string, 
/** 卷宗类型编码 */ volumeTypeCode: string, 
/** 卷宗类型名称 */ volumeTypeName: string, 
/** 卷宗名称 */ volumeName: string, 
/** 是否有正卷(1:是,0:否) */ hasMainVolume: string, 
/** 是否有副卷(1:是,0:否) */ hasSubVolume: string, 
/** 正卷目录数量 */ mainCatalogCount?: number, 
/** 副卷目录数量 */ subCatalogCount?: number, 
/** 正卷目录列表 */ mainCatalogList: ArchiveVolumeCatalogDTO[], 
/** 副卷目录列表 */ subCatalogList?: ArchiveVolumeCatalogDTO[], 
/** 封面二维码显示(1:显示,0:不显示) */ showQrcode: string, 
/** 封面条形码显示(1:显示,0:不显示) */ showBarcode: string, 
/** 拍摄人姓名显示(1:显示,0:不显示) */ showPhotographer: string, 
/** 申请查看卷宗是否审批(1:需要,0:不需要) */ needApproval: string, 
/** 备注 */ remark?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/config/archiveVolume/updateArchiveVolumeConfig",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：删除卷宗配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function removeArchiveVolumeConfig(data?: {
/** 主键 */ id?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/config/archiveVolume/removeArchiveVolumeConfig",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：复制卷宗配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function copyArchiveVolumeConfig(data?: {
/** 主键 */ id?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: "/config/archiveVolume/copyArchiveVolumeConfig",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：分页查询卷宗配置列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function getArchiveVolumeConfigPageList(data?: {
/** 分页参数 页码数 默认1 */ pageNum?: number, 
/** 分页参数 每页条数 默认10 */ length?: number, 
/** 对象排序字段 */ orderField?: string, 
/** 对象排序方式 asc,desc */ orderMethod?: string, 
/** 综合监管：查询参数管辖单位过滤 */ deptSearchLikeStr?: string, 
/** 条线编码 */ lineCode?: string, 
/** 卷宗类型编码 */ volumeTypeCode?: string, 
/** 卷宗类型(1:正卷,2:副卷,空串:全部) */ volumeType?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<ArchiveVolumeConfigVO>>>({
        url: "/config/archiveVolume/getArchiveVolumeConfigPageList",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：查看卷宗配置和案卷号配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function getArchiveVolumeAndCaseNumberConfig(data?: {
/** 条线编码 */ lineCode?: string, 
/** 卷宗类型编码 */ volumeTypeCode?: string, 
/** 机构编码 */ orgCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ArchiveVolumeAndCaseNumberConfigVO>>({
        url: "/config/archiveVolume/getArchiveVolumeAndCaseNumberConfig",
        type: "POST",
        data,
        ...options
    })
}

/** 枚举 - 是否有正卷 */
export enum Sfyzj {
    /** 是 */
    S = '1',
    /** 否 */
    F = '0',
}
/** 枚举对象 - 是否有正卷 */
export const SfyzjObj = { 
    [Sfyzj.S]: { label: '是', value: Sfyzj.S },
    [Sfyzj.F]: { label: '否', value: Sfyzj.F },
}

/** 枚举 - 是否有副卷 */
export enum Sfyfj {
    /** 是 */
    S = '1',
    /** 否 */
    F = '0',
}
/** 枚举对象 - 是否有副卷 */
export const SfyfjObj = { 
    [Sfyfj.S]: { label: '是', value: Sfyfj.S },
    [Sfyfj.F]: { label: '否', value: Sfyfj.F },
}

/** 枚举 - 封面二维码显示 */
export enum Fmewmxs {
    /** 显示 */
    XS = '1',
    /** 不显示 */
    BXS = '0',
}
/** 枚举对象 - 封面二维码显示 */
export const FmewmxsObj = { 
    [Fmewmxs.XS]: { label: '显示', value: Fmewmxs.XS },
    [Fmewmxs.BXS]: { label: '不显示', value: Fmewmxs.BXS },
}

/** 枚举 - 封面条形码显示 */
export enum Fmtxmxs {
    /** 显示 */
    XS = '1',
    /** 不显示 */
    BXS = '0',
}
/** 枚举对象 - 封面条形码显示 */
export const FmtxmxsObj = { 
    [Fmtxmxs.XS]: { label: '显示', value: Fmtxmxs.XS },
    [Fmtxmxs.BXS]: { label: '不显示', value: Fmtxmxs.BXS },
}

/** 枚举 - 拍摄人姓名显示 */
export enum Psrxmxs {
    /** 显示 */
    XS = '1',
    /** 不显示 */
    BXS = '0',
}
/** 枚举对象 - 拍摄人姓名显示 */
export const PsrxmxsObj = { 
    [Psrxmxs.XS]: { label: '显示', value: Psrxmxs.XS },
    [Psrxmxs.BXS]: { label: '不显示', value: Psrxmxs.BXS },
}

/** 枚举 - 申请查看卷宗是否审批 */
export enum Sqckjzsfsp {
    /** 需要 */
    XY = '1',
    /** 不需要 */
    BXY = '0',
}
/** 枚举对象 - 申请查看卷宗是否审批 */
export const SqckjzsfspObj = { 
    [Sqckjzsfsp.XY]: { label: '需要', value: Sqckjzsfsp.XY },
    [Sqckjzsfsp.BXY]: { label: '不需要', value: Sqckjzsfsp.BXY },
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
    /**枚举数组 - 是否有正卷 */
    Sfyzj: {
        options: [
            { label: '是', value: Sfyzj.S },
            { label: '否', value: Sfyzj.F },
        ]
    },
    /**枚举数组 - 是否有副卷 */
    Sfyfj: {
        options: [
            { label: '是', value: Sfyfj.S },
            { label: '否', value: Sfyfj.F },
        ]
    },
    /**枚举数组 - 封面二维码显示 */
    Fmewmxs: {
        options: [
            { label: '显示', value: Fmewmxs.XS },
            { label: '不显示', value: Fmewmxs.BXS },
        ]
    },
    /**枚举数组 - 封面条形码显示 */
    Fmtxmxs: {
        options: [
            { label: '显示', value: Fmtxmxs.XS },
            { label: '不显示', value: Fmtxmxs.BXS },
        ]
    },
    /**枚举数组 - 拍摄人姓名显示 */
    Psrxmxs: {
        options: [
            { label: '显示', value: Psrxmxs.XS },
            { label: '不显示', value: Psrxmxs.BXS },
        ]
    },
    /**枚举数组 - 申请查看卷宗是否审批 */
    Sqckjzsfsp: {
        options: [
            { label: '需要', value: Sqckjzsfsp.XY },
            { label: '不需要', value: Sqckjzsfsp.BXY },
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

export interface ArchiveVolumeCatalogDTO {

    /**
     * 文书目录名称
     */
    catalogName: string

    /**
     * 组卷序号
     */
    sortNo: number

    /**
     * 正/副卷(1:正卷,2:副卷)
     */
    volumeType: string

    /**
     * 是否含附件(1:是,0:否)
     */
    hasAttachment: string

    /**
     * 文书目录编码
     */
    catalogCode: string

    /**
     * 卷宗配置唯一标识
     */
    volumeConfigId: string

    /**
     * 备注
     */
    remark: string

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

export interface ArchiveVolumeCatalogVO {

    /**
     * 正/副卷(1:正卷,2:副卷)
     */
    volumeType: string

    /**
     * 创建人id
     */
    creatorId: string

    /**
     * 创建人姓名
     */
    creatorName: string

    /**
     * 文书目录编码
     */
    catalogCode: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 备注
     */
    remark: string

    /**
     * 文书目录名称
     */
    catalogName: string

    /**
     * 组卷序号
     */
    sortNo: number

    /**
     * 是否含附件(1:是,0:否)
     */
    hasAttachment: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 更新人id
     */
    updaterId: string

    /**
     * 更新人姓名
     */
    updaterName: string

    /**
     * 卷宗配置唯一标识
     */
    volumeConfigId: string

    /**
     * 主键
     */
    id: string

}

export interface ArchiveVolumeConfigVO {

    /**
     * 封面条形码显示(1:显示,0:不显示)
     */
    showBarcode: string

    /**
     * 创建人id
     */
    creatorId: string

    /**
     * 创建人姓名
     */
    creatorName: string

    /**
     * 条线名称
     */
    lineName: string

    /**
     * 是否有正卷(1:是,0:否)
     */
    hasMainVolume: string

    /**
     * 备注
     */
    remark: string

    /**
     * 卷宗类型编码
     */
    volumeTypeCode: string

    /**
     * 封面二维码显示(1:显示,0:不显示)
     */
    showQrcode: string

    /**
     * 条线编码
     */
    lineCode: string

    /**
     * 卷宗类型名称
     */
    volumeTypeName: string

    /**
     * 副卷目录列表
     */
    subCatalogList: ArchiveVolumeCatalogVO[]

    /**
     * 更新人id
     */
    updaterId: string

    /**
     * 正卷目录数量
     */
    mainCatalogCount: number

    /**
     * 主键
     */
    id: string

    /**
     * 是否有副卷(1:是,0:否)
     */
    hasSubVolume: string

    /**
     * 是否有效(1:有效,0:无效)
     */
    isValid: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 版本号
     */
    version: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 卷宗名称
     */
    volumeName: string

    /**
     * 更新人姓名
     */
    updaterName: string

    /**
     * 正卷目录列表
     */
    mainCatalogList: ArchiveVolumeCatalogVO[]

    /**
     * 副卷目录数量
     */
    subCatalogCount: number

    /**
     * 拍摄人姓名显示(1:显示,0:不显示)
     */
    showPhotographer: string

    /**
     * 申请查看卷宗是否审批(1:需要,0:不需要)
     */
    needApproval: string

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

export interface ArchiveCaseNumberConfigVO {

    /**
     * 全宗号限制条件(1:格式不可编辑,2:格式可编辑)
     */
    fondNumberLimit: string

    /**
     * 目录号限制条件(1:格式不可编辑,2:格式可编辑)
     */
    catalogNumberLimit: string

    /**
     * 条线名称
     */
    lineName: string

    /**
     * 是否有正卷(1:是,0:否)
     */
    hasMainVolume: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 备注
     */
    remark: string

    /**
     * 卷宗类型编码
     */
    volumeTypeCode: string

    /**
     * 案卷号限制条件(1:自动获取决定书编号,2:自动获取立案编号)
     */
    caseNumberLimit: string

    /**
     * 条线编码
     */
    lineCode: string

    /**
     * 卷宗类型名称
     */
    volumeTypeName: string

    /**
     * 目录号
     */
    catalogNumber: string

    /**
     * 全宗号
     */
    fondNumber: string

    /**
     * 案卷号
     */
    caseNumber: string

    /**
     * 卷宗名称
     */
    volumeName: string

    /**
     * 卷宗配置唯一标识
     */
    volumeConfigId: string

    /**
     * 主键
     */
    id: string

    /**
     * 是否有副卷(1:是,0:否)
     */
    hasSubVolume: string

}

export interface ArchiveVolumeAndCaseNumberConfigVO {

    /**
     * 卷宗配置信息
     */
    volumeConfig: ArchiveVolumeConfigVO

    /**
     * 案卷号配置信息
     */
    caseNumberConfig: ArchiveCaseNumberConfigVO

}

