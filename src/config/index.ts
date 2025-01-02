const VUE_APP_ENV = process.env.VUE_APP_ENV

// 默认配置（线上环境）
const defaultConfig = {
    ZZD_CONFIG: {
        /** 浙政钉扫码登录地址 */
        loginUrl:
            'https://login-pro.ding.zj.gov.cn/qrlogin/webAppLogin.htm?APP_NAME=tz_ding_xtzh_dingoa&protocolKey=tz_ding_xtzh_dingoa-6UoRjaqyQj&protocol=oauth2&BACK_URL=https://www.icinfo.cn&embedMode=true&scope=get_user_info&state=',
        /** 登录域名 */
        loginDomain: 'https://login-pro.ding.zj.gov.cn',
    },
}

// 本地环境
if (VUE_APP_ENV === 'dev') {
    Object.assign(defaultConfig, {
        ZZD_CONFIG: {
            loginUrl:
                'https://login-pro.ding.zj.gov.cn/qrlogin/webAppLogin.htm?APP_NAME=tz_ding_xtzh_dingoa&protocolKey=tz_ding_xtzh_dingoa-6UoRjaqyQj&protocol=oauth2&BACK_URL=https://www.icinfo.cn&embedMode=true&scope=get_user_info&state=',
            loginDomain: 'https://login-pro.ding.zj.gov.cn',
        },
    })
} else if (VUE_APP_ENV === 'uat') {
    // 测试环境
} else if (VUE_APP_ENV === 'fat') {
    // 开发环境
}

export { defaultConfig }
export default defaultConfig
