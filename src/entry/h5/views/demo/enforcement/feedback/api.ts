import { http } from '@/scripts/http'
import { ExAxiosRequestConfig } from 'icinfo-request'

/**
 * 提交执法结果反馈
 */
export function submitFeedback(
    data: {
        /** 所属领域 */
        domain: string
        /** 案事件类型 */
        caseType: string
        /** 执法事项所属领域 */
        enforcementDomain: string
        /** 执法事项所属类型 */
        enforcementType: string
        /** 事项 */
        enforcementItem: string
        /** 处置方式 */
        handleMethod: string
        /** 处置反馈 */
        handleNote: string
        /** 图片/视频列表 */
        attachments?: string[]
        /** 附件列表 */
        proofFiles?: string[]
    },
    options?: ExAxiosRequestConfig,
) {
    return http.request({
        url: '/enforcement/feedback/submit',
        method: 'POST',
        data,
        ...options,
    })
}

// Mock数据
export const mockSubmitFeedback = async () => {
    return {
        code: 200,
        message: '提交成功',
        data: null,
    }
}
