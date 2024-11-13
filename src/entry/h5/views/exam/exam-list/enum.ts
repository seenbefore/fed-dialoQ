/** 考试状态 */
export enum ExamStatusEnum {
    /** 未开始 */
    NOT_START = 0,
    /** 进行中 */
    IN_PROGRESS = 1,
    /** 已结束 */
    FINISHED = 2,
}

export const ExamStatusEnumMap: Record<string, any> = {
    [ExamStatusEnum.NOT_START]: {
        label: '未开始',
        value: ExamStatusEnum.NOT_START,
        color: '#999999',
    },
    [ExamStatusEnum.IN_PROGRESS]: {
        label: '进行中',
        value: ExamStatusEnum.IN_PROGRESS,
        color: '#00B578',
    },
    [ExamStatusEnum.FINISHED]: {
        label: '已结束',
        value: ExamStatusEnum.FINISHED,
        color: '#E6032D',
    },
}
