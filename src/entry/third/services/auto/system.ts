/**
 * @file API：/system
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * 二期前端页面获取用户信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getUserInfo(data?: {
/** 主键 */ id?: string, 
/** 登录用户名 */ username?: string, 
/** 登录密码 */ password?: string, 
/** 密码盐值 */ passwordSalt?: string, 
/** 用户唯一编号 */ identity?: string, 
/** 真实姓名 */ realName?: string, 
/** 电子邮件 */ email?: string, 
/** 创建时间 */ createTime?: string, 
/** 最后登录时间 */ lastLoginTime?: string, 
/** 用户状态（0：无效  1有效） */ status?: string, 
/** 用户描述 */ desc?: string, 
/** 证件号 */ cerno?: string, 
/** 用工类型（1：正式工   2：临时工   3：其他） */ employeeType?: string, 
/** 岗位 */ post?: string, 
/** 归属机构编码 */ organizationCode?: string, 
/** 在职状态（1：在职  2：离职  3：其他） */ workStatus?: string, 
/** 联系方式（电话或手机号） */ phone?: string, 
/** 证件类型（1：身份证   2：军官证   3：护照   4：港澳通行证   5：签证   6：其它） */ cernoType?: string, 
userLoginNum?: number, 
/** 用户上次修改密码时间 */ lastModifyPwdTime?: string, 
/** 角色层级 1：个人/客户经理 2：支行登录 3：总行登录 0 网点 */ roleLev?: string, 
/** 用户角色 */ roles?: string[], 
orgCode?: string, 
orgName?: string, 
simpleName?: string, 
roleName?: string, 
sort?: string, 
parentCode?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<Result<SysUserDto>>({
        url: "/system/getUserInfo",
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

export interface SysUserDto {

    userLoginNum: number

    /**
     * 用户角色
     */
    roles: string[]

    /**
     * 登录密码
     */
    password: string

    /**
     * 岗位
     */
    post: string

    parentCode: string

    /**
     * 用户唯一编号
     */
    identity: string

    /**
     * 角色层级 1：个人/客户经理 2：支行登录 3：总行登录 0 网点
     */
    roleLev: string

    orgCode: string

    /**
     * 用户上次修改密码时间
     */
    lastModifyPwdTime: string

    /**
     * 主键
     */
    id: string

    /**
     * 密码盐值
     */
    passwordSalt: string

    /**
     * 电子邮件
     */
    email: string

    /**
     * 在职状态（1：在职  2：离职  3：其他）
     */
    workStatus: string

    orgName: string

    /**
     * 证件类型（1：身份证   2：军官证   3：护照   4：港澳通行证   5：签证   6：其它）
     */
    cernoType: string

    sort: string

    /**
     * 真实姓名
     */
    realName: string

    /**
     * 最后登录时间
     */
    lastLoginTime: string

    /**
     * 证件号
     */
    cerno: string

    /**
     * 用工类型（1：正式工   2：临时工   3：其他）
     */
    employeeType: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 归属机构编码
     */
    organizationCode: string

    /**
     * 联系方式（电话或手机号）
     */
    phone: string

    simpleName: string

    roleName: string

    /**
     * 登录用户名
     */
    username: string

    /**
     * 用户状态（0：无效  1有效）
     */
    status: string

    /**
     * 用户描述
     */
    desc: string

}

