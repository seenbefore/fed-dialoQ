// 静态配置
const StaticConfig = {}
// 不同环境配置
const EnvMap: any = {
    dev: {
        thirdLoginUrl: 'http://localhost:3000/api/oauth/gitlab',
    },
    fat: {},
    uat: {},
    prod: {},
}
const config = EnvMap[process.env.VUE_APP_ENV] || {}
const AppConfig = {
    ...StaticConfig,
    ...config,
}
console.log('AppConfig', AppConfig)
// 覆盖全局配置

export default AppConfig
