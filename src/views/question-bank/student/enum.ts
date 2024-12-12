/** 是否消防人员 */
export enum FiremanEnum {
    /** 否 */
    NO = '0',
    /** 是 */
    YES = '1',
}

export const FiremanEnumMap: Record<string, any> = {
    [FiremanEnum.NO]: {
        label: '否',
        value: FiremanEnum.NO,
    },
    [FiremanEnum.YES]: {
        label: '是',
        value: FiremanEnum.YES,
    },
}
