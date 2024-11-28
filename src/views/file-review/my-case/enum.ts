/** 申请状态 */
export enum StatusEnum {
    /** 待审批 */
    PENDING = '1',
    /** 通过 */
    APPROVED = '2',
    /** 退回 */
    REJECTED = '3',
}

export const StatusEnumMap = {
    [StatusEnum.PENDING]: { label: '待审批', value: StatusEnum.PENDING },
    [StatusEnum.APPROVED]: { label: '通过', value: StatusEnum.APPROVED },
    [StatusEnum.REJECTED]: { label: '退回', value: StatusEnum.REJECTED },
}
