import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result } from '@/@types'

export interface LoginVO {
    /** 用户token */
    token: string
    /** 用户信息 */
    userInfo: {
        /** 用户ID */
        id: string
        /** 用户名 */
        username: string
        /** 真实姓名 */
        realName: string
        /** 手机号 */
        mobile: string
        /** 头像 */
        avatar: string
    }
}

/**
 * 用户登录
 * @param data 登录参数
 * @param options 请求配置
 */
export function login(
    data?: {
        /** 用户名 */ username: string
        /** 密码 */ password: string
        /** 验证码 */ captcha?: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request<Result<LoginVO>>({
        url: '/user/login',
        method: 'post',
        data,
        ...options,
    })
}

/**
 * 获取验证码
 */
export function getCaptcha(options?: ExAxiosRequestConfig) {
    return http.request<Result<string>>({
        url: '/user/captcha',
        method: 'get',
        ...options,
    })
}
