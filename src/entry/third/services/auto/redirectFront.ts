/**
 * @file API：/redirectFront
 */

import { ExAxiosRequestConfig } from 'icinfo-request'
import { http2 } from "@/entry/third/scripts/http"

/**
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function redirect(data?: {
redirectUrl?: string, 
}, options?: ExAxiosRequestConfig) {
    return http2.request<null>({
        url: "/redirectFront/redirect",
        type: "GET",
        data,
        ...options
    })
}

