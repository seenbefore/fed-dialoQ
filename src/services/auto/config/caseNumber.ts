import { Dictionary as DictionaryFront } from '../_dict'
/**
 * @file API：/config/caseNumber
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 描述：分页查询案卷号配置列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function getCaseNumberConfigList(data?: {
/** 分页参数 页码数 默认1 */ pageNum?: number, 
/** 分页参数 每页条数 默认10 */ length?: number, 
/** 对象排序字段 */ orderField?: string, 
/** 对象排序方式 asc,desc */ orderMethod?: string, 
/** 综合监管：查询参数管辖单位过滤 */ deptSearchLikeStr?: string, 
/** 机构编码 */ orgCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<ArchiveCaseNumberConfigVO>>>({
        url: "/config/caseNumber/getCaseNumberConfigList",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 描述：更新案卷号配置
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function updateCaseNumberConfig(data?: {
/** 主键 */ id: string, 
/** 全宗号 */ fondNumber?: string, 
/** 全宗号限制条件(1:格式不可编辑,2:格式可编辑) */ fondNumberLimit?: string, 
/** 目录号 */ catalogNumber?: string, 
/** 目录号限制条件(1:格式不可编辑,2:格式可编辑) */ catalogNumberLimit?: string, 
/** 案卷号 */ caseNumber?: string, 
/** 案卷号限制条件(1:自动获取决定书编号,2:自动获取立案编号) */ caseNumberLimit?: string, 
/** 备注 */ remark?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<boolean>>({
        url: "/config/caseNumber/updateCaseNumberConfig",
        type: "POST",
        data,
        ...options
    })
}

/** 枚举 - 全宗号限制条件 */
export enum Qzhxztj {
    /** 格式不可编辑 */
    GSBKBJ = '1',
    /** 格式可编辑 */
    GSKBJ = '2',
}
/** 枚举对象 - 全宗号限制条件 */
export const QzhxztjObj = { 
    [Qzhxztj.GSBKBJ]: { label: '格式不可编辑', value: Qzhxztj.GSBKBJ },
    [Qzhxztj.GSKBJ]: { label: '格式可编辑', value: Qzhxztj.GSKBJ },
}

/** 枚举 - 目录号限制条件 */
export enum Mlhxztj {
    /** 格式不可编辑 */
    GSBKBJ = '1',
    /** 格式可编辑 */
    GSKBJ = '2',
}
/** 枚举对象 - 目录号限制条件 */
export const MlhxztjObj = { 
    [Mlhxztj.GSBKBJ]: { label: '格式不可编辑', value: Mlhxztj.GSBKBJ },
    [Mlhxztj.GSKBJ]: { label: '格式可编辑', value: Mlhxztj.GSKBJ },
}

/** 枚举 - 案卷号限制条件 */
export enum Ajhxztj {
    /** 自动获取决定书编号 */
    ZDHQJDSBH = '1',
    /** 自动获取立案编号 */
    ZDHQLABH = '2',
}
/** 枚举对象 - 案卷号限制条件 */
export const AjhxztjObj = { 
    [Ajhxztj.ZDHQJDSBH]: { label: '自动获取决定书编号', value: Ajhxztj.ZDHQJDSBH },
    [Ajhxztj.ZDHQLABH]: { label: '自动获取立案编号', value: Ajhxztj.ZDHQLABH },
}



export const Dict = new DictionaryFront({
    /**枚举数组 - 全宗号限制条件 */
    Qzhxztj: {
        options: [
            { label: '格式不可编辑', value: Qzhxztj.GSBKBJ },
            { label: '格式可编辑', value: Qzhxztj.GSKBJ },
        ]
    },
    /**枚举数组 - 目录号限制条件 */
    Mlhxztj: {
        options: [
            { label: '格式不可编辑', value: Mlhxztj.GSBKBJ },
            { label: '格式可编辑', value: Mlhxztj.GSKBJ },
        ]
    },
    /**枚举数组 - 案卷号限制条件 */
    Ajhxztj: {
        options: [
            { label: '自动获取决定书编号', value: Ajhxztj.ZDHQJDSBH },
            { label: '自动获取立案编号', value: Ajhxztj.ZDHQLABH },
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

