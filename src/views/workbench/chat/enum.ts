/** 消息状态 */
export enum MessageStatusEnum {
    /** 加载中 */
    LOADING = 'loading',
    /** 已完成 */
    COMPLETED = 'completed',
    /** 错误 */
    ERROR = 'error',
}

export const MessageStatusEnumMap: Record<string, any> = {
    [MessageStatusEnum.LOADING]: {
        label: '加载中',
        value: MessageStatusEnum.LOADING,
        color: '#E6A23C',
    },
    [MessageStatusEnum.COMPLETED]: {
        label: '已完成',
        value: MessageStatusEnum.COMPLETED,
        color: '#67C23A',
    },
    [MessageStatusEnum.ERROR]: {
        label: '错误',
        value: MessageStatusEnum.ERROR,
        color: '#F56C6C',
    },
}
