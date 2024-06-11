/** 文件类型 */
export enum ENUM_FILE_TYPE {
    PDF = 'pdf',
    IMG = 'img',
}

/** 文件类型配置 */
export const CONFIG: Record<string, any> = {
    [ENUM_FILE_TYPE.PDF]: {
        icon: 'pdf',
        iconSelected: 'pdf-active',
        isPdf: true,
    },
    [ENUM_FILE_TYPE.IMG]: {
        icon: 'pic',
        iconSelected: 'pic-active',
        isImg: true,
    },
}

/** 切换操作 */
export enum ENUM_TOGGLE {
    /** 上一个 */
    PRE = 'pre',
    /** 下一个 */
    NEXT = 'next',
}
