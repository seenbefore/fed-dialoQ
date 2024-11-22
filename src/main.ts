import { desktopMainInit } from '@/scripts/desktopMainInit'
import { getURLParameters } from 'icinfo-util'
import Vue from 'vue'
import App from './App.vue'
import { LocalMenu } from './menus'
// 路由
import router from './router'
import http from './scripts/http'
import defaultSettings from './settings'
// 状态管理
import store from './store'
import { settingsStore, userStore } from './store/useStore'
import './styles/index.less'
import { useConfirm, IUseConfirm } from '@/components/confirmDialog/useConfirm'

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
customConfirm('33')
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

desktopMainInit(App, store, router, { userStore, settingsStore }, defaultSettings).then(() => {
    const { settings, user } = defaultSettings ?? {}
    userStore.set(user)
    // 本地调试的时候 加载全量菜单 可删除
    if (process.env.NODE_ENV === 'development') {
        userStore.setPermissionMenus(LocalMenu)
    }
    const { token } = getURLParameters(location.href)
    if (token) {
        userStore.login(token)
        // TODO do something
    }
})
