// 注入 v-highlight 指令 可选
import '@/components/directives/highlight'
import '@/components/registerGlobalComp'
import '@/components/registerAdminComp'
import modalDialog from '@/scripts/ModalDialog'
import '@/sharegood-ui'
import { desktopInit } from '@@core/data/configurations/initConfig/desktopInit'
import { getURLParameters } from 'icinfo-util'
import Vue from 'vue'
import App from './App.vue'
// 全局组件
import './components/registerGlobComp'
import router from './router'
import http from './scripts/http'
import store from './store'
import './styles/index.less'

Vue.use(modalDialog, { store, router })

const { bootstrap } = desktopInit(Vue)

Vue.prototype.$http = http

bootstrap(() => {
    const { token } = getURLParameters(location.href)
    if (token) {
        // TODO set token or get userInfo
    }
}).then(mount => mount({ router, store, App }))
