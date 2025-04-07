/** 问卷状态 */
export enum QuestionnaireStatusEnum {
    /** 草稿 */
    DRAFT = '0',
    /** 已发布 */
    PUBLISHED = '1',
    /** 已下线 */
    OFFLINE = '2',
}

export const QuestionnaireStatusEnumMap: Record<string, any> = {
    [QuestionnaireStatusEnum.DRAFT]: {
        label: '草稿',
        value: QuestionnaireStatusEnum.DRAFT,
        color: '#909399',
    },
    [QuestionnaireStatusEnum.PUBLISHED]: {
        label: '已发布',
        value: QuestionnaireStatusEnum.PUBLISHED,
        color: '#67C23A',
    },
    [QuestionnaireStatusEnum.OFFLINE]: {
        label: '已下线',
        value: QuestionnaireStatusEnum.OFFLINE,
        color: '#F56C6C',
    },
}
