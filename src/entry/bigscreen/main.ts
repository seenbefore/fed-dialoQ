import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './scripts/http'
import '@/element-ui'
import '@/sharegood-ui'
import './components'
import './style.less'
import './config/app'
Vue.prototype.$http = http

/* 条件编译 (必须是运行时可用的环境变量，并且变量值不能为 undefined，否则模块必定会打包) */
if (process.env.VUE_APP_MOCK === 'true') {
    require('./mock')
}

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
