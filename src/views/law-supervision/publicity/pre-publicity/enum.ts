/** 公示状态 */
export enum PublicityStatusEnum {
    /** 未公示 */
    UNPUBLISHED = '0',
    /** 已公示 */
    PUBLISHED = '1',
}

export const PublicityStatusEnumMap: Record<string, any> = {
    [PublicityStatusEnum.UNPUBLISHED]: {
        label: '未公示',
        value: PublicityStatusEnum.UNPUBLISHED,
    },
    [PublicityStatusEnum.PUBLISHED]: {
        label: '已公示',
        value: PublicityStatusEnum.PUBLISHED,
    },
}

/** 公示信息类型 */
export enum PublicityTypeEnum {
    /** 执法主体信息公示 */
    SUBJECT = '1',
    /** 执法人员信息公示 */
    PERSONNEL = '2',
    /** 执法职责信息公示 */
    DUTY = '3',
    /** 执法程序信息公示 */
    PROCEDURE = '4',
    /** 执法事项信息公示 */
    MATTER = '5',
    /** 裁量基准信息公示 */
    DISCRETION = '6',
}

export const PublicityTypeEnumMap: Record<string, any> = {
    [PublicityTypeEnum.SUBJECT]: {
        label: '执法主体信息公示',
        value: PublicityTypeEnum.SUBJECT,
    },
    [PublicityTypeEnum.PERSONNEL]: {
        label: '执法人员信息公示',
        value: PublicityTypeEnum.PERSONNEL,
    },
    [PublicityTypeEnum.DUTY]: {
        label: '执法职责信息公示',
        value: PublicityTypeEnum.DUTY,
    },
    [PublicityTypeEnum.PROCEDURE]: {
        label: '执法程序信息公示',
        value: PublicityTypeEnum.PROCEDURE,
    },
    [PublicityTypeEnum.MATTER]: {
        label: '执法事项信息公示',
        value: PublicityTypeEnum.MATTER,
    },
    [PublicityTypeEnum.DISCRETION]: {
        label: '裁量基准信息公示',
        value: PublicityTypeEnum.DISCRETION,
    },
}
