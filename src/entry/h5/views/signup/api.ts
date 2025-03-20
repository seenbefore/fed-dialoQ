import { ExAxiosRequestConfig } from 'icinfo-request'
import { http } from '@/scripts/http'
import { Result } from '@/@types'

/** 活动详情返回数据 */
export interface ActivityDetailVO {
    /** 活动ID */
    id: string
    /** 活动标题 */
    title: string
    /** 活动海报URL */
    posterUrl: string
    /** 活动开始时间 */
    startTime: string
    /** 活动结束时间 */
    endTime: string
    /** 活动地点 */
    location: string
    /** 活动详情（富文本） */
    description: string
    /** 活动费用 */
    fee: number
    /** 报名截止时间 */
    signupEndTime: string
    /** 活动名额 */
    quota: number
    /** 剩余名额 */
    remainingQuota: number
    /** 报名状态：0-未开始，1-进行中，2-已截止，3-名额已满 */
    signupStatus: number
}

/** 报名信息提交参数 */
export interface SignupSubmitDTO {
    /** 活动ID */
    activityId: string
    /** 姓名 */
    name: string
    /** 手机号 */
    mobile: string
    /** 身份证号 */
    idCard: string
    /** 年龄 */
    age: number
    /** 性别：1-男，2-女 */
    gender: number
    /** 紧急联系人 */
    emergencyContact: string
    /** 紧急联系人电话 */
    emergencyPhone: string
}

/** 获取活动详情 */
export function getActivityDetail(activityId: string, config?: ExAxiosRequestConfig): Promise<Result<ActivityDetailVO>> {
    return http.post('/activity/detail', { activityId }, config)
}

/** 提交报名信息 */
export function submitSignup(data: SignupSubmitDTO, config?: ExAxiosRequestConfig): Promise<Result<void>> {
    return http.post('/activity/signup', data, config)
}

/** 获取报名状态 */
export function getSignupStatus(
    activityId: string,
    config?: ExAxiosRequestConfig,
): Promise<
    Result<{
        status: number
        remainingQuota: number
    }>
> {
    return http.post('/activity/signup-status', { activityId }, config)
}
