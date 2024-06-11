// 静态配置
const StaticConfig = {}
// 不同环境配置
const EnvMap: any = {
    dev: {},
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

export { AppConfig }
export default AppConfig
