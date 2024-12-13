import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result } from '@/@types'

export interface InspectionFormVO {
    /** 勘察地址 */
    inspectionAddress: string
    /** 勘察时间 */
    inspectionTime: string
    /** 勘察人员 */
    inspectors: string[]
}

/**
 * 保存现场勘察信息
 */
export function saveInspection(data: InspectionFormVO, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/inspection/save',
        method: 'post',
        data,
        ...options,
    })
}
