/** 正/副卷 */
export enum VolumeTypeEnum {
    /** 全部 */
    ALL = '',
    /** 正卷 */
    MAIN = '1',
    /** 副卷 */
    VICE = '2',
}

export const VolumeTypeEnumMap: Record<string, any> = {
    [VolumeTypeEnum.ALL]: {
        label: '全部',
        value: VolumeTypeEnum.ALL,
    },
    [VolumeTypeEnum.MAIN]: {
        label: '正卷',
        value: VolumeTypeEnum.MAIN,
    },
    [VolumeTypeEnum.VICE]: {
        label: '副卷',
        value: VolumeTypeEnum.VICE,
    },
}
