/** 状态 */
export enum StatusEnum {
    /** 禁用 */
    DISABLED = '0',
    /** 启用 */
    ENABLED = '1',
}

export const StatusEnumMap: Record<string, any> = {
    [StatusEnum.DISABLED]: {
        label: '禁用',
        value: StatusEnum.DISABLED,
    },
    [StatusEnum.ENABLED]: {
        label: '启用',
        value: StatusEnum.ENABLED,
    },
}
