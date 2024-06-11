/* 存储浙里办的一些配置信息 */
class Config {
    private static _instance: Config
    public static getInstance(): Config {
        if (!Config._instance) {
            Config._instance = new Config()
        }
        return Config._instance
    }
    /* 构建单例App对象 */
    private constructor() {}

    /* 应用名称 */
    public readonly appName = 'app名称'

    /* IRS-对应项目-配置-获取APPKEY-中间部分 */
    public readonly miniAppId = '2002323517'

    /* 单点登录的接口url */
    public readonly loginUrl = '/officekeeper/ZlbLogin/login'

    /* 3des加密的配置信息 */
    public readonly encryptConfig = {
        /* 密钥 */
        key: 'hysbzm@qazxswed@11223345',
        /* 向量 */
        iv: 'ZJHUIXIN',
    }

    /* vuex存储的key */
    public readonly vuexKey = Symbol('zlb-h5').toString()

    /* 跳转到首页 */
    public get getHomeUrl(): string {
        const isProd = process.env.NODE_ENV === 'production'
        return `https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/${this.miniAppId}/${isProd ? 'reserved' : 'lastTest'}/index.html`
    }
}

export const ZLBConfig = Config.getInstance()
