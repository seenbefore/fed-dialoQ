const VUE_APP_ENV = process.env.VUE_APP_ENV
const VUE_APP_APP_ID = process.env.VUE_APP_APP_ID || 'default'
import defaultSettings from '../settings'
import { deepMerge } from '@/utils/merge'

const AppConfigMap = {
    default: {
        title: 'dialoQ',
        key: VUE_APP_APP_ID,
        settings: {
            title: 'dialoQ',
        },
    },
    fz: {
        key: VUE_APP_APP_ID,
        title: '法助应用',
        settings: {
            title: '法助应用',
        },
        theme: {
            name: 'fz',
            variables: {
                '--color-primary': '#588ffa',
                '--color-success': '#6DD400',
                '--color-warning': '#FF7D00',
                '--color-danger': '#F4333C',
                '--color-info': '#666666',
            },
        },
    },
}
const appConfig: any = AppConfigMap[VUE_APP_APP_ID]
// 默认配置
const defaultConfig = deepMerge(defaultSettings, appConfig)
// 合并配置
Object.assign(defaultSettings, defaultConfig)
// 本地环境
if (VUE_APP_ENV === 'dev') {
} else if (VUE_APP_ENV === 'uat') {
    // 测试环境
} else if (VUE_APP_ENV === 'fat') {
    // 开发环境
} else if (VUE_APP_ENV === 'prod') {
    // 生产环境
}

export { defaultConfig }
export default defaultConfig
