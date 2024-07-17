import '@/styles/global.less'
import '@/theme/vant'
import { mobileInit } from '@@core/common/configurations/initConfig/mobileInit'
import { getURLParameters } from 'icinfo-util'
import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import './components'
import router from './router'
import http from './scripts/http'
import modalDialog from './scripts/ModalDialog'
import store from './store'
import './styles/app.less'

Vue.prototype.$modalDialog = modalDialog
Vue.prototype.$http = http

const { bootstrap } = mobileInit(Vue)

bootstrap(async () => {
    /* 嵌入第三方免登进入 */
    const { token = '' } = getURLParameters(location.href)

    if (token) {
        // TODO set token or get userInfo
    }
}).then(mount => mount({ store, router, App }))
