import '@/components/directives/copy'
import '@/components/registerAdminComp'
import '@/components/registerGlobalComp'
import { adminInit } from '@/scripts/init/adminInit'
import { LocalMenu } from '@admin/menus'
import 'icinfo-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// 路由
import router from './router'
import defaultSettings from './settings'
// 状态管理
import store from './store'
import { settingsStore, userStore } from './store/useStore'
import './styles/index.less'

const { bootstrap } = adminInit(store, router, settingsStore, userStore, defaultSettings)

bootstrap(App, LocalMenu)
