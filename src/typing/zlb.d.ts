interface IZWJSBridge {
    /* 0 为公务员、1 为个人（除公务员）、2 为法人。注意：公务员属于特殊类型的个人用户，当应用服务需要同时支持个人和法人使用，可通过以上接口，获取APP当前登录用户类型后，再发起个人或法人的单点登录认证，0或1都属于个人用户，2为法人用户 */
    getUserType(): Promise<{ userType: '0' | '1' | '2' }>

    /* 关闭通过openLink打开的页面 */
    close(): Promise<void>

    /* 在一个新的窗口加载一个新的页面 */
    openLink(params: { url?: string; type?: string }): Promise<void>

    /* ZWJSBridge初始化成功 */
    onReady(callback?: () => any): void

    /* 老年版和常规版判断，elder 为老年版, normal 为标准模式 */
    getUiStyle(params?: Record<string, any>): Promise<{ uiStyle: 'elder' | 'normal' }>

    ssoTicket(): Promise<{ result?: boolean; ticketId: string }>

    /* 打电话 */
    phoneCall(params: { corpId: string /* 电话号码？ */ }): Promise<void>

    /* 获取经纬度 */
    getLocation(): Promise<{ longitude: string /* 经度 */; latitude: string /* 纬度 */; city: string /* 所在城市名称 */; cityName: string; detailAddress: string /* 详细地址 */ }>

    /* 设置title */
    setTitle(params: { title: string }): Promise<void>

    /* 选择城市 */
    selectCity(params?: Record<any, any>): Promise<{ cityName: string; cityId: string }>

    /* 人脸识别 */
    zmAuthentication(params?: Record<any, any>): Promise<{ pass: boolean /* 是否通过人脸 */ }>

    /* 存储数据缓存 */
    setLocalStorage(params: { key: string; value: any }): Promise<any>

    /* 读取数据缓存 */
    getLocalStorage(params: { key: string }): Promise<{ [key in string]: any }>

    /* 删除缓存 */
    removeLocalStorage(params: { key: string }): Promise<any>

    /*
     * 选择图片
     * TODO 上传图片必须使用浙里办提供的上传方法
     *  返回结果： res?.picSrc || res?.picPath || []  // 一个是安卓的，一个是ios的返回值，在将结果转化为base64即可
     * */
    chooseImage(params: { upload?: boolean }): Promise<{ result: string; picPath?: string[]; picSrc?: string[] }>
}

/* 浙里办埋点 */
declare class ZwLog {
    constructor(options: { _user_id: string; _user_nick: string })

    onReady(callback: () => void): void

    sendPV(data: { miniAppName: string; miniAppId: string; Page_duration: number; t2: number; t0: number; log_status: '01' | '02'; pageId: string; pageName: string; _user_id: string }): void

    record(type: 'yourTrackerEventCode', type2: 'CLK'): void
}

declare interface Window {
    /* 浙里办相关API */
    ZWJSBridge: IZWJSBridge

    /* 用于判断web-view */
    __wxjs_environment?: 'miniprogram' | string

    /* ZwLog */
    ZwLog: ZwLog
}

declare const ZWJSBridge: IZWJSBridge
