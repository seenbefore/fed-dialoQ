import 'normalize.css'
import '@/styles/global.less'
import Vue from 'vue'
import router from './router'
import store from './store'
import '@/vant'
import App from './App.vue'
import './components'
import './styles/app.less'
import http from './scripts/http'
import modalDialog from './scripts/ModalDialog'
import { getURLParameters } from 'icinfo-util'

Vue.prototype.$modalDialog = modalDialog
Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'
Vue.prototype.$http = http

async function bootstrap() {
    // 嵌入第三方免登进入
    const { token = '' } = getURLParameters(location.href)

    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}

bootstrap()
