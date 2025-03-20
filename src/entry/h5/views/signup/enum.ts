/** 报名状态枚举 */
export enum SignupStatus {
    /** 未开始 */
    NOT_STARTED = 0,
    /** 进行中 */
    IN_PROGRESS = 1,
    /** 已截止 */
    ENDED = 2,
    /** 名额已满 */
    FULL = 3,
}

/** 性别枚举 */
export enum Gender {
    /** 男 */
    MALE = 1,
    /** 女 */
    FEMALE = 2,
}

/** 报名状态文案 */
export const SignupStatusText = {
    [SignupStatus.NOT_STARTED]: '报名未开始',
    [SignupStatus.IN_PROGRESS]: '报名进行中',
    [SignupStatus.ENDED]: '报名已截止',
    [SignupStatus.FULL]: '名额已满',
}

/** 性别选项 */
export const GenderOptions = [
    { text: '男', value: Gender.MALE },
    { text: '女', value: Gender.FEMALE },
]
