/** 申请状态 */
export enum StatusEnum {
    /** 待审批 */
    PENDING = '1',
    /** 申批通过 */
    APPROVED = '2',
    /** 申批退回 */
    REJECTED = '3',
}

export const StatusEnumMap: Record<string, any> = {
    [StatusEnum.PENDING]: {
        label: '待审批',
        value: StatusEnum.PENDING,
    },
    [StatusEnum.APPROVED]: {
        label: '申批通过',
        value: StatusEnum.APPROVED,
    },
    [StatusEnum.REJECTED]: {
        label: '申批退回',
        value: StatusEnum.REJECTED,
    },
}
