import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

interface AuthResult {
    success: boolean
    message: string
}

/**
 * 获取认证结果
 */
export const getAuthResult = async (options?: ExAxiosRequestConfig) => {
    // 模拟数据
    return {
        code: 200,
        message: 'success',
        data: {
            success: false,
            message: '认证失败',
        } as AuthResult,
    }
}
