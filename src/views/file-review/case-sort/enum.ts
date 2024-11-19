/** 整理状态 */
export enum SORT_STATUS {
    /** 待整理 */
    PENDING = '0',
    /** 已整理 */
    SORTED = '1',
}

export const SORT_STATUS_MAP: Record<string, any> = {
    [SORT_STATUS.PENDING]: {
        label: '待整理',
        value: SORT_STATUS.PENDING,
        color: '#E6032D',
    },
    [SORT_STATUS.SORTED]: {
        label: '已整理',
        value: SORT_STATUS.SORTED,
        color: '#00B578',
    },
}
