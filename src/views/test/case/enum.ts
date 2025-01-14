/** 用例类型 */
export enum CaseTypeEnum {
    /** 接口测试 */
    API = '1',
    /** UI测试 */
    UI = '2',
    /** 性能测试 */
    PERFORMANCE = '3',
}

export const CaseTypeEnumMap: Record<string, any> = {
    [CaseTypeEnum.API]: {
        label: '接口测试',
        value: CaseTypeEnum.API,
    },
    [CaseTypeEnum.UI]: {
        label: 'UI测试',
        value: CaseTypeEnum.UI,
    },
    [CaseTypeEnum.PERFORMANCE]: {
        label: '性能测试',
        value: CaseTypeEnum.PERFORMANCE,
    },
}

/** 优先级 */
export enum PriorityEnum {
    /** P0 */
    P0 = '0',
    /** P1 */
    P1 = '1',
    /** P2 */
    P2 = '2',
    /** P3 */
    P3 = '3',
}

export const PriorityEnumMap: Record<string, any> = {
    [PriorityEnum.P0]: {
        label: 'P0',
        value: PriorityEnum.P0,
        color: '#F53F3F',
    },
    [PriorityEnum.P1]: {
        label: 'P1',
        value: PriorityEnum.P1,
        color: '#FF7D00',
    },
    [PriorityEnum.P2]: {
        label: 'P2',
        value: PriorityEnum.P2,
        color: '#005ff5',
    },
    [PriorityEnum.P3]: {
        label: 'P3',
        value: PriorityEnum.P3,
        color: '#6DD400',
    },
}

/** 执行状态 */
export enum ExecuteStatusEnum {
    /** 未执行 */
    UNEXECUTED = '0',
    /** 执行中 */
    EXECUTING = '1',
    /** 已通过 */
    PASSED = '2',
    /** 未通过 */
    FAILED = '3',
}

export const ExecuteStatusEnumMap: Record<string, any> = {
    [ExecuteStatusEnum.UNEXECUTED]: {
        label: '未执行',
        value: ExecuteStatusEnum.UNEXECUTED,
        color: '#666666',
    },
    [ExecuteStatusEnum.EXECUTING]: {
        label: '执行中',
        value: ExecuteStatusEnum.EXECUTING,
        color: '#005ff5',
    },
    [ExecuteStatusEnum.PASSED]: {
        label: '已通过',
        value: ExecuteStatusEnum.PASSED,
        color: '#6DD400',
    },
    [ExecuteStatusEnum.FAILED]: {
        label: '未通过',
        value: ExecuteStatusEnum.FAILED,
        color: '#F53F3F',
    },
}
