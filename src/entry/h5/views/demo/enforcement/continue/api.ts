import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

/**
 * 提交执法继续处置
 */
export function submitContinue(
    data: {
        /** 处置意见 */
        handleNote: string
        /** 消息通知方式：1-钉消息 2-短信 */
        messageNotify: string[]
        /** 通知人员 */
        notifyUsers: Array<{
            /** 用户ID */
            value: string
            /** 用户名称 */
            label: string
            /** 手机号 */
            phone: string
        }>
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request({
        url: '/enforcement/continue/submit',
        method: 'POST',
        data,
        ...options,
    })
}

// Mock数据
export const mockSubmitContinue = async () => {
    return {
        code: 200,
        message: '提交成功',
        data: null,
    }
}
