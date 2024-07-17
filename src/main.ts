// 项目的全局组件 指令、混入等
import '@/components/registerAdminComp'
import { LocalMenu } from '@/menus'
// 弹窗插件
import modalDialog from '@/scripts/ModalDialog'
import { desktopInit } from '@@core/common/configurations/initConfig/desktopInit'
import { getURLParameters } from 'icinfo-util'
import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
import defaultSettings from './settings'
// 状态管理
import store from './store'
import { settingsStore, userStore } from './store/useStore'
// 项目样式
import './styles/index.less'

Vue.use(modalDialog, { store, router })
const { settings, user } = defaultSettings

userStore.set(user)
Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'

const { bootstrap } = desktopInit(Vue)

bootstrap(() => {
    // 本地调试的时候 加载全量菜单 可删除
    if (process.env.NODE_ENV === 'development') {
        userStore.setPermissionMenus(LocalMenu)
    }
    // 嵌入第三方免登进入
    const { token = '' } = getURLParameters(location.href)
    if (token) {
        userStore.clear()
        userStore.login(decodeURIComponent(token))
    }
    // 此处添加获取全局配置等异步操作
    settings.isThirdParty = location.href.indexOf('isThirdParty') > -1
    settingsStore.changeSetting(settings)
}).then(mount => mount({ router, store, themeStore: settingsStore, App }))
