/** 整理状态 */
export enum ARRANGE_STATUS {
    /** 已整理2 */
    SORTED = '2',
    /** 未整理1 */
    PENDING = '1',
}
/** 整理状态MAP */
export const ARRANGE_STATUS_MAP: Record<string, any> = {
    [ARRANGE_STATUS.SORTED]: {
        label: '已整理',
        value: ARRANGE_STATUS.SORTED,
        color: '#00B578',
    },
    [ARRANGE_STATUS.PENDING]: {
        label: '未整理',
        value: ARRANGE_STATUS.PENDING,
        color: '#E6032D',
    },
}
