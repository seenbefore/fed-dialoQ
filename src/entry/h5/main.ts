import '@/styles/global.less'
import '@/vant'
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
