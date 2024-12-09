import { desktopMainInit } from '@/scripts/desktopMainInit'
import { getURLParameters } from 'icinfo-util'
import Vue from 'vue'
import App from './App.vue'
import { LocalMenu } from './menus'
// 路由
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
 */
Vue.prototype.$back = async function(params: any) {
    const { path } = params ?? {}
    const target: any = flatRoutes.find(item => {
        return item.path === path || item.fullPath === path
    })
    if (target && path) {
        await tagsViewStore.delCachedView({
            name: target.name,
        })
    }
    await tagsViewStore.delView(this.$route)
    if (params) {
        this.$router.push(params)
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
 * 初始化用户信息
 */
const { settings, user } = defaultSettings ?? {}
userStore.set(user)
// 本地调试的时候 加载全量菜单 可删除
if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_ENV === 'fat') {
    userStore.setPermissionMenus(LocalMenu)
}
const { token } = getURLParameters(location.href)
if (token) {
    userStore.login(token)
    // TODO do something
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
desktopMainInit(App, store, router, { userStore, settingsStore }, defaultSettings).then(() => {})
