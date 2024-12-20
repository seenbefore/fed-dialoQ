/** 操作类型 */
export enum OperationTypeEnum {
    /** 登录 */
    LOGIN = 'LOGIN',
    /** 新增 */
    CREATE = 'CREATE',
    /** 修改 */
    UPDATE = 'UPDATE',
    /** 删除 */
    DELETE = 'DELETE',
    /** 导出 */
    EXPORT = 'EXPORT',
}

export const OperationTypeEnumMap: Record<string, any> = {
    [OperationTypeEnum.LOGIN]: {
        label: '登录',
        value: OperationTypeEnum.LOGIN,
    },
    [OperationTypeEnum.CREATE]: {
        label: '新增',
        value: OperationTypeEnum.CREATE,
    },
    [OperationTypeEnum.UPDATE]: {
        label: '修改',
        value: OperationTypeEnum.UPDATE,
    },
    [OperationTypeEnum.DELETE]: {
        label: '删除',
        value: OperationTypeEnum.DELETE,
    },
    [OperationTypeEnum.EXPORT]: {
        label: '导出',
        value: OperationTypeEnum.EXPORT,
    },
}

/** 操作状态 */
export enum OperationStatusEnum {
    /** 成功 */
    SUCCESS = '1',
    /** 失败 */
    FAIL = '0',
}

export const OperationStatusEnumMap: Record<string, any> = {
    [OperationStatusEnum.SUCCESS]: {
        label: '成功',
        value: OperationStatusEnum.SUCCESS,
        color: '#67C23A',
    },
    [OperationStatusEnum.FAIL]: {
        label: '失败',
        value: OperationStatusEnum.FAIL,
        color: '#F56C6C',
    },
}

/** 操作模块 */
export enum OperationModuleEnum {
    /** 用户管理 */
    USER = 'USER',
    /** 角色管理 */
    ROLE = 'ROLE',
    /** 菜单管理 */
    MENU = 'MENU',
    /** 字典管理 */
    DICT = 'DICT',
    /** 部门管理 */
    DEPT = 'DEPT',
}

export const OperationModuleEnumMap: Record<string, any> = {
    [OperationModuleEnum.USER]: {
        label: '用户管理',
        value: OperationModuleEnum.USER,
    },
    [OperationModuleEnum.ROLE]: {
        label: '角色管理',
        value: OperationModuleEnum.ROLE,
    },
    [OperationModuleEnum.MENU]: {
        label: '菜单管理',
        value: OperationModuleEnum.MENU,
    },
    [OperationModuleEnum.DICT]: {
        label: '字典管理',
        value: OperationModuleEnum.DICT,
    },
    [OperationModuleEnum.DEPT]: {
        label: '部门管理',
        value: OperationModuleEnum.DEPT,
    },
}
