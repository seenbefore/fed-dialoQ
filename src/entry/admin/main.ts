import '@/components/directives/copy'
import '@/components/registerAdminComp'
import '@/components/registerGlobalComp'
import modalDialog from '@/scripts/ModalDialog'
import { desktopInit } from '@@core/data/configurations/initConfig/desktopInit'
import { LocalMenu } from '@admin/menus'
import 'icinfo-ui/lib/theme-chalk/index.css'
import { getURLParameters } from 'icinfo-util'
import http from './scripts/http'
import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
import defaultSettings from './settings'
// 状态管理
import store from './store'
import { settingsStore, userStore } from './store/useStore'
import './styles/index.less'

const { bootstrap } = desktopInit(Vue)

Vue.use(modalDialog, { store, router })

Vue.prototype.$http = http

bootstrap(() => {
    const { settings, user } = defaultSettings ?? {}
    userStore.set(user)
    // 本地调试的时候 加载全量菜单 可删除
    if (process.env.NODE_ENV === 'development') {
        userStore.setPermissionMenus(LocalMenu)
    }
    const { isThirdParty, token } = getURLParameters(location.href)

    // 此处添加获取全局配置等异步操作
    settings.isThirdParty = isThirdParty ? true : settings.isThirdParty
    settingsStore.changeSetting(settings as any)

    if (token) {
        // TODO set token or get userInfo
    }
}).then(mount => mount({ router, store, themeStore: settingsStore, App }))
