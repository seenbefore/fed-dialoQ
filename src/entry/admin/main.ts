import { desktopMainInit } from '@/scripts/desktopMainInit'
import { LocalMenu } from '@admin/menus'
import { getURLParameters } from 'icinfo-util'
import App from './App.vue'
// 路由
import router from './router'
import defaultSettings from './settings'
// 状态管理
import store from './store'
import { settingsStore, userStore } from './store/useStore'
import './styles/index.less'

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
