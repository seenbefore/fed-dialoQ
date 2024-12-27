import { desktopMainInit } from '@/scripts/desktopMainInit'
import { getURLParameters } from 'icinfo-util'
import Vue from 'vue'
import App from './App.vue'
// 路由树和一维路由数组
import router, { flatRoutes } from './router'
import http from './scripts/http'
import defaultSettings from './settings'
// 状态管理
import store from './store'
import { settingsStore, userStore, tagsViewStore } from './store/useStore'
import './styles/index.less'
import { useConfirm, IUseConfirm } from '@/components/confirmDialog/useConfirm'
import { IDefinedThemeValue } from 'icinfo-ui/packages/helper/theme/definedTheme'

/**
 * 关闭当前标签页
 * @param params 参数
 * @param params.path 上一页路由路径
 * @param params.reload 是否刷新上一页
 * @example
 * this.$back({ path: '/system/department', reload: false }) // 不刷新上一页
 * this.$back({ path: '/system/department' }) // 刷新上一页
 */
Vue.prototype.$back = async function(params: any) {
    const { path, reload = false } = params ?? {}
    const target: any = flatRoutes.find(item => {
        return item.path === path || item.fullPath === path
    })
    // 默认清除上一页缓存
    if (reload && target && target.name) {
        await tagsViewStore.delCachedView({
            name: target.name,
        })
    }
    await tagsViewStore.delView(this.$route)

    if (path) {
        this.$router.push({
            path,
        })
    } else {
        this.$router.go(-1)
    }
}
// 自定义确认框风格样式
const customConfirm = (options: IUseConfirm | string) => {
    const defaultOptions = {
        title: '提示',
        titleIcon: 'el-icon-warning',
        titleIconStyle: 'color: var(--color-warning)',
    } as IUseConfirm

    const finalOptions = typeof options === 'string' ? { ...defaultOptions, message: options } : { ...defaultOptions, ...options }

    return useConfirm(finalOptions)
}

Vue.prototype.$confirm = customConfirm
Vue.prototype.$http = http
/**
 * 向父级发送消息
 * @param data
 */
Vue.prototype.$postMessage = function(data: any) {
    console.log('postMessage==>', data)
    try {
        window.parent.postMessage(data, '*')
    } catch (error) {
        console.error(error)
    }
}

/**
 * 设置自定义主题名称和色系
 */
settingsStore.updateThemeName('blue')
let themeVariables: IDefinedThemeValue = {
    '--color-primary': '#005ff5',
    '--color-success': '#6DD400',
    '--color-warning': '#FF7D00',
    '--color-danger': '#F4333C',
    '--color-info': '#666666',
}
settingsStore.updateThemeVariables(themeVariables)
/* 条件编译 (必须是运行时可用的环境变量，并且变量值不能为 undefined，否则模块必定会打包) */
if (process.env.VUE_APP_MOCK === 'true') {
    require('./mock')
}

async function bootstrap() {
    let { token } = getURLParameters(location.href)
    console.log('token :>> ', token)
    if (token) {
        await userStore.syncLoginWithToken(token)
    }
    desktopMainInit(
        App,
        store,
        router,
        { userStore, settingsStore },
        {
            ...defaultSettings,
            $ShareGood: {
                DataView: {
                    pagination: { pageSize: 10 },
                    pageActionLayout: [
                        {
                            key: 'export',
                            label: '导出',
                        },
                        {
                            key: 'exportAll',
                            label: '导出全部',
                        },
                    ],
                },
            },
        },
    ).then(() => {})
}
bootstrap()
