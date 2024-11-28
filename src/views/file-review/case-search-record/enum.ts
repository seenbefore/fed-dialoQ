/** 审批状态 */
export enum StatusEnum {
    /** 待审批 */
    PENDING = '0',
    /** 审批通过 */
    APPROVED = '1',
    /** 审批退回 */
    REJECTED = '2',
}

export const StatusEnumMap: Record<string, any> = {
    [StatusEnum.PENDING]: {
        label: '待审批',
        value: StatusEnum.PENDING,
        color: '#E6032D',
    },
    [StatusEnum.APPROVED]: {
        label: '审批通过',
        value: StatusEnum.APPROVED,
        color: '#00B578',
    },
    [StatusEnum.REJECTED]: {
        label: '审批退回',
        value: StatusEnum.REJECTED,
        color: '#FF9900',
    },
}
