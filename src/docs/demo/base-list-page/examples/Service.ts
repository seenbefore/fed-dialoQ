/**当事人类型 */
export enum PARTY_TYPE {
    /**个人 */
    PERSON = '1',
    /**公司 */
    COMPANY = '2',
}
/**案件类型 */
export enum CASE_TYPE {
    /**简易程序 */
    SIMPLE = '简易程序',
    /**普通程序 */
    NORMAL = '普通程序',
    /**快速办理 */
    QUICK = '快速办理',
}
/**案件状态 */
export enum CASE_STATUS {
    /**办案中 */
    PROCEEDING = '2',
    /**暂停/中止 */
    SUSPEND = '3',
}

/**适用领域类别 */
export enum APPLY_AREA_TYPE {
    /**全省 */
    ALL_PROVINCE = '0',
    /**指定类别 */
    ASSIGN = '1',
}
export const applyAreaTypeMap: Record<string, any> = {
    [APPLY_AREA_TYPE.ALL_PROVINCE]: {
        value: APPLY_AREA_TYPE.ALL_PROVINCE,
        label: '全省',
    },
    [APPLY_AREA_TYPE.ASSIGN]: {
        value: APPLY_AREA_TYPE.ASSIGN,
        label: '指定类别',
    },
}

/**适用领域类别 */
export enum APPLY_FIELD_TYPE {
    /**全省 */
    ALL_PROVINCE = '0',
    /**指定类别 */
    ASSIGN = '1',
}
/**适用领域类别 */
export const applyFieldTypeMap: Record<string, any> = {
    [APPLY_FIELD_TYPE.ALL_PROVINCE]: {
        value: APPLY_FIELD_TYPE.ALL_PROVINCE,
        label: '全省',
    },
    [APPLY_FIELD_TYPE.ASSIGN]: {
        value: APPLY_FIELD_TYPE.ASSIGN,
        label: '指定类别',
    },
}

/**适用级别 */
export enum APPLY_LEVEL {
    /**全部 */
    ALL = '0',
    /**省级机构 */
    PROVINCE = '1',
    /**地市机构 */
    CITY = '2',
    /**区县机构 */
    COUNTY = '3',
    /**派出机构 */
    POLICE = '4',
    /**乡镇机构 */
    TOWNSHIP = '5',
}
/**适用级别 */
export const applyLevelMap: Record<string, any> = {
    [APPLY_LEVEL.ALL]: {
        value: APPLY_LEVEL.ALL,
        label: '全部',
    },
    [APPLY_LEVEL.PROVINCE]: {
        value: APPLY_LEVEL.PROVINCE,
        label: '省级机构',
    },
    [APPLY_LEVEL.CITY]: {
        value: APPLY_LEVEL.CITY,
        label: '地市机构',
    },
    [APPLY_LEVEL.COUNTY]: {
        value: APPLY_LEVEL.COUNTY,
        label: '区县机构',
    },
    [APPLY_LEVEL.POLICE]: {
        value: APPLY_LEVEL.POLICE,
        label: '派出机构',
    },
    [APPLY_LEVEL.TOWNSHIP]: {
        value: APPLY_LEVEL.TOWNSHIP,
        label: '乡镇机构',
    },
}
