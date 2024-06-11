/** 文件配置 */
export interface Iconfig {
    /** 文件icon */
    icon: string
    /** 选中icon */
    iconSelected: string
    isImg?: boolean
    isPdf?: boolean
}

/** 文件项 */
export interface IFileItem {
    /** 文件名 */
    name: string
    /** 文件服务器路径地址 */
    url?: string
    /** 文件类型 */
    type: string
    /** 文件完整链接 */
    src?: string
    /** 文件配置 */
    $config?: Iconfig | undefined
    /** 文件懒加载状态 */
    $loading?: boolean
}

export interface IFileGroup {
    /** 预览标题 */
    name: string
    /** 预览文件数组 */
    fileList: IFileItem[]
}

/** 数据库文件配置 */
export interface IConfig {
    /** 成功打开数据库回调函数 */
    success: function
    /** 获取数据库缓存文件列表回调函数 */
    onLoadFile: function
    /** 数据库缓存索引，根据storeKey获取缓存的数据 */
    storeKey: string
    /** 数据库版本变动回调函数，数据库版本变动清空所有文件配置数据 */
    onUpgrad: function
    /** 成功缓存需要预览的文件列表数据回调函数 */
    onCacheFileGroupData: function
    /** 缓存天数-预览文件列表 */
    cacheDaysData: number
    /** 缓存天数-图片预览配置 */
    cacheDaysImgConfig: number
    /** （开发用）缓存天数-预览文件列表 */
    cacheDaysDataDev: number
    /** （开发用）缓存天数-图片预览配置 */
    cacheDaysImgConfigDev: number
}
