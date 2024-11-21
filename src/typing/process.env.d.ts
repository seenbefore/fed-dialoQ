// 不好用
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV: 'development' | 'production' | 'test'
            readonly VUE_APP_ENV: 'dev' | 'fat' | 'uat' | 'prod' | 'fat1'

            readonly BASE_URL: string
            readonly VUE_APP_BASEURL_API: '/**/*' | 'http*(s)://**/*'

            readonly VUE_APP_MOCK: 'true' | 'false'
        }
    }
}
// 生效
declare let process: {
    env: {
        readonly NODE_ENV: 'development' | 'production' | 'test'
        readonly VUE_APP_ENV: 'dev' | 'fat' | 'uat' | 'prod' | 'fat1' | 'stage'

        readonly BASE_URL: string
        readonly VUE_APP_BASEURL_API: '/**/*' | 'http*(s)://**/*'

        readonly VUE_APP_MOCK: 'true' | 'false'

        /* 是否为浙里办开发环境 */
        readonly VUE_APP_IS_ZLB_DEV_ENV: string

        /* 是否为浙里办环境 */
        readonly VUE_APP_ZLB_APP: string
        readonly VUE_APP_BASEURL_LOGIN_API: string
        /* 埋点ID */
        readonly VUE_APP_CLIENTID: string
        /* 埋点秘钥 */
        readonly VUE_APP_CLIENTSECRET: string
        /* pdf地址 */
        readonly VUE_APP_PDF_API: string
        /* 文书接口地址 */
        readonly VUE_APP_BASEURL_API_DOC: string
    }
}
