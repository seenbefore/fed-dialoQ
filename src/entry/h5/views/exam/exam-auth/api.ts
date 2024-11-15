import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

interface AuthForm {
    userName: string
    idCard: string
    mobile: string
    studentId: string
    company: string
}

/**
 * 提交实名认证
 */
export const submitAuth = async (data: AuthForm, options?: ExAxiosRequestConfig) => {
    return {
        code: 200,
        message: 'success',
        data: null,
    }
}
