import '@/element-ui'
import '@/sharegood-ui'
import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import './components'
import './config/app'
import router from './router'
import http from './scripts/http'
import './style.less'
Vue.prototype.$http = http

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
