/** 审批状态 */
export enum AUDIT_STATUS {
    /** 待审批 */
    PENDING = '0',
    /** 审批通过 */
    PASSED = '1',
    /** 审批退回 */
    REJECTED = '2',
}

export const AUDIT_STATUS_MAP: Record<string, any> = {
    [AUDIT_STATUS.PENDING]: {
        label: '待审批',
        value: AUDIT_STATUS.PENDING,
        color: '#E6032D',
    },
    [AUDIT_STATUS.PASSED]: {
        label: '审批通过',
        value: AUDIT_STATUS.PASSED,
        color: '#00B578',
    },
    [AUDIT_STATUS.REJECTED]: {
        label: '审批退回',
        value: AUDIT_STATUS.REJECTED,
        color: '#FF9900',
    },
}
