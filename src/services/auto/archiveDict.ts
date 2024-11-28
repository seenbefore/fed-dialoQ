/**
 * @file API：/archiveDict
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 描述：查询字典列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author claude
 */
export function getDictList(data?: {
params?: {[key: string]: string}, 
/** 分页页码 */ pageNum?: number, 
/** 分页长度 */ length?: number, 
/** 字典所属系统（1、后台管理） */ dictBelongSystem?: string, 
/** 类型（1、字典；2、字典值） */ type?: string, 
/** 字典类型 */ dictType?: string, 
/** 字典编码 */ dictCode?: string, 
/** 字典中文名称 */ dictChineseName?: string, 
/** 字典启用状态（1、启用；0、禁用） */ dictEnableStatus?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<ArchiveSysDictVO[]>>({
        url: "/archiveDict/getDictList",
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

export interface ArchiveSysDictVO {

    /**
     * 字典中文名称
     */
    dictChineseName: string

    /**
     * 字典父代码
     */
    dictParentCode: string

    /**
     * 字典排序
     */
    dictSort: string

    /**
     * 更新时间
     */
    updateTime: string

    /**
     * 字典唯一标识
     */
    dictId: string

    /**
     * 类型（1、字典；2、字典值）
     */
    type: string

    /**
     * 字典类型
     */
    dictType: string

    /**
     * 是否为系统内置字典（1、内置；0、非内置）
     */
    isInternalDict: string

    /**
     * 字典描述
     */
    dictDesc: string

    /**
     * 字典所属系统（1、后台管理）
     */
    dictBelongSystem: string

    /**
     * 字典编码
     */
    dictCode: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 字典英文名称
     */
    dictEnglishName: string

    /**
     * 字典值2
     */
    dictCode2: string

    /**
     * 主键
     */
    id: string

    /**
     * 字典值1
     */
    dictCode1: string

    /**
     * 字典启用状态（1、启用；0、禁用）
     */
    dictEnableStatus: string

}

