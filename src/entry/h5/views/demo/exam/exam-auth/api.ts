import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result } from '@/@types'

export interface ExamUserVO {
    /** 用户ID */
    userId: string
    /** 用户姓名 */
    userName: string
    /** 用户手机号 */
    mobile: string
    /** 用户身份证号 */
    idCard: string
    /** 学号 */
    studentNo?: string
    /** 单位全称 */
    orgName?: string
    /** 是否实名认证 */
    isRealName?: string
    /** 考卷ID */
    paperId: string
}

/**
 * 保存考试用户信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function submitAuth(data?: ExamUserVO, options?: ExAxiosRequestConfig) {
    return http.request<Result<any>>({
        url: '/exam/manage/saveExamUser',
        method: 'POST',
        data,
        ...options,
    })
}
