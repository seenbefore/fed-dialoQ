/** 点击动作指令 */
export enum ENUM_ACTION {
    /** 缩小 */
    ZOOMOUT = 'zoomout',
    /** 放大 */
    ZOOMIN = 'zoomin',
    /** 左旋转 */
    ROTATELEFT = 'rotateleft',
    /** 右旋转 */
    ROTATERIGHT = 'rotateright',
    /** 复原 */
    RESET = 'reset',
}

/** 图片配置 */
export interface IPreviewConfig {
    /** 缩放倍数 */
    scale: number
    /** 旋转角度 */
    angle: number
}
