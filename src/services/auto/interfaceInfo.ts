/**
 * @file API：/interfaceInfo
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from "@/scripts/http"

/**
 * 根据接口id查询接口及入参信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author yangsizhen
 */
export function getInterfaceInfoById(data?: {
/** 接口id */ apiId: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<InterfaceInfoDto>>({
        url: "/interfaceInfo/getInterfaceInfoById",
        type: "POST",
        contentType: "application/json",
        data,
        ...options
    })
}

/**
 * 分页列表数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author framework-generator
 */
export function getInterfaceInfoList(data?: {
pageNum?: number, 
length?: number, 
orderField?: string, 
orderMethod?: string, 
/** 搜索关键字（支持接口注释与接口地址模糊搜索） */ keyWord?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<InterfaceInfoPageDto>>>({
        url: "/interfaceInfo/getInterfaceInfoList",
        type: "POST",
        data,
        ...options
    })
}

/**
 * 查询接口标识
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 * @author yangsizhen
 */
export function getInterfaceMarkList(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<InterfaceMark[]>>({
        url: "/interfaceInfo/getInterfaceMarkList",
        type: "POST",
        contentType: "application/json",
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

export interface InterfaceConfigDto {

    /**
     * 接口返回列表字段集合
     */
    columns: {[key: string]: any}

    /**
     * 接口查询字段集合
     */
    search: {[key: string]: any}

}

export interface InterfaceInfoDto {

    /**
     * 接口配置信息类
     */
    interfaceConfigDto: InterfaceConfigDto

    /**
     * 接口注释
     */
    apiComment: string

    /**
     * 接口id
     */
    apiId: string

    /**
     * 接口路径
     */
    apiPath: string

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

export interface InterfaceInfoPageDto {

    /**
     * 注释
     */
    apiComment: string

    /**
     * id
     */
    apiId: string

    /**
     * 接口地址
     */
    apiPath: string

}

export interface InterfaceMark {

    /**
     * 接口标识
     */
    apiMark: string

    /**
     * 接口标识名称
     */
    apiMarkName: string

    /**
     * 查询api详情接口url
     */
    apiDetailUrl: string

    /**
     * 接口url
     */
    apiUrl: string

    /**
     * 查询所有api分页接口url
     */
    apiPageUrl: string

    /**
     * 自增主键
     */
    id: number

}

