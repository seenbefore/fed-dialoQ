import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

/**
 * 提交执法审核
 */
export function submitApprove(
    data: {
        /** 处置方式 1-流转至其他平台 2-答复 3-处置 */
        handleMethod: string
        /** 流转平台 */
        targetPlatform?: string
        /** 处置意见 */
        handleNote: string
        /** 图片/视频列表 */
        proofFiles?: string[]
        /** 附件列表 */
        attachments?: string[]
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request({
        url: '/enforcement/approve/submit',
        method: 'POST',
        data,
        ...options,
    })
}

// Mock数据
export const mockSubmitApprove = async () => {
    return {
        code: 200,
        message: '提交成功',
        data: null,
    }
}
