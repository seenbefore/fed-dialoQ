export const FileTypeByArrayBufferStartWith: Record<string, string> = {
    ffd8ff: 'JPEG',
    89504e47: 'PNG ',
    47494638: 'GIF',
    '504B0304': 'ZIP',
    52617221: 'RAR',
}

export enum LINE_CODE {
    /**人设 */
    RS = 'rs',
    /**应急 */
    YJ = 'yj',
    /**自然资源 */
    ZRZY = 'zrzy',
    /**生态环境 */
    STHJ = 'sthj',
    /**农业农村 */
    NYNC = 'nync',
    /**综合执法 */
    ZHZF = 'zhzf',
    /**文旅 */
    WL = 'wl',
}
/**条线code映射 */
export const LINECODE_MAP = {
    /**人设 */
    [LINE_CODE.RS]: 'A017',
    /**应急 */
    [LINE_CODE.YJ]: 'A024',
    /**自然资源 */
    [LINE_CODE.ZRZY]: 'A031',
    /**生态环境 */
    [LINE_CODE.STHJ]: 'A019',
    /**农业农村 */
    [LINE_CODE.NYNC]: 'A028',
    /**综合执法 */
    [LINE_CODE.ZHZF]: 'A022',
    /**文旅 */
    [LINE_CODE.WL]: 'A055',
}
/**控件类型枚举 */
export enum CONTROL_TYPE {
    /**文本 */
    TEXT = '0',
    /**输入框 */
    INPUT = '1',
    /**数字框 */
    NUMBER_INPUT = '2',
    /**日期时间 */
    DATETIME = '3',
    /**签字签章 */
    SING = '4',
    /**签名 */
    HANDWRITTEN_SIGN = '5',
    /**复选框 */
    CHECKBOX = '8',
    /**选择框 */
    SELECT = '9',
    /**表格 */
    TABLE = '10',
    /**级联选择 */
    CASCADER = '11',
    /**图片 */
    IMAGE = '12',
    /**地图选址 */
    MAP_ADDRESS = '13',
    /**上传 */
    UPLOAD = '15',
    /**责令选择器 */
    ORDER_SELECT = '99',
}
/**文书跨组件通讯事件名 */
export const DOCPARSE_EVENT = 'DOCPARSE_EVENT'
