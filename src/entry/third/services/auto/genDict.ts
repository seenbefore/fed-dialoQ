/**
 * @file API：/genDict
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 获取字典详情
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author liuxianglin
 */
export function detail(data?: {
/** 字典类型编码 */ dictTypeCode?: string, 
/** true 忽视字典不存在/禁用情形,返回空对象,false 字典不存在/禁用 报错,缺省值 false */ ignoreNotExist?: boolean, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<DictDto>>({
        url: "/genDict/detail",
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

export interface DictDto$DictDataInfo {

    /**
     * 是否默认: 1-是,0-否
     */
    ifDefault: number

    /**
     * 层级
     */
    level: number

    /**
     * 字典标签
     */
    label: string

    /**
     * 排序值
     */
    sort: number

    /**
     * 字典键值
     */
    value: string

    /**
     * 子字典数据
     */
    childDictDatas: DictDto$DictDataInfo[]

}

export interface DictDto$DictTypeInfo {

    /**
     * 字典名称
     */
    name: string

    /**
     * 字典编码
     */
    code: string

}

export interface DictDto {

    /**
     * 字典数据
     */
    dictDataInfos: DictDto$DictDataInfo[]

    /**
     * 字典类型信息
     */
    dictTypeInfo: DictDto$DictTypeInfo

}

