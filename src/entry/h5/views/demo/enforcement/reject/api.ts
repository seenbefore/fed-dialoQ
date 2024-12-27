import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

/**
 * 提交执法退回
 */
export function submitReject(
    data: {
        /** 退回原因 */
        rejectReason: string
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request({
        url: '/enforcement/reject/submit',
        method: 'POST',
        data,
        ...options,
    })
}

// Mock数据
export const mockSubmitReject = async () => {
    return {
        code: 200,
        message: '提交成功',
        data: null,
    }
}
