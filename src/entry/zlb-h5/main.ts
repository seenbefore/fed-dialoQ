import '@/styles/global.less'
import '@/vant'
import { getURLParameters } from 'icinfo-util'
import 'normalize.css'
import { Notify, Toast } from 'vant'
import Vue from 'vue'
import App from './App.vue'
import './assets/less/index.less'
import './components'
import router from './router'
import http from './scripts/http'
import modalDialog from './scripts/ModalDialog'
import store from './store'
import './styles/app.less'

Vue.prototype.$modalDialog = modalDialog
Vue.prototype.$http = http
Vue.prototype.$notify = Notify
Vue.prototype.$functionInConstruction = () => Toast({ message: '功能建设中', duration: 500 })
Vue.config.devtools = process.env.VUE_APP_ENV === 'dev' || process.env.VUE_APP_ENV === 'stage'
Vue.config.productionTip = false

async function bootstrap() {
    // 嵌入第三方免登进入
    const { token = '' } = getURLParameters(location.href)
    if (token) {
        // TODO set token or get userInfo
    }
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}
bootstrap()
