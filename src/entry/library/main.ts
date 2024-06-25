// 注入 v-highlight 指令 可选
import '@/components/directives/highlight'
import '@/components/registerGlobalComp'
import { initShareGood } from '@/scripts/init/initShareGood'
import modalDialog from '@/scripts/ModalDialog'
import '@/sharegood-ui'
import ElementUI from 'element-ui'
import { getURLParameters } from 'icinfo-util'
import Vue from 'vue'
import App from './App.vue'
// 全局组件
import './components/registerGlobComp'
import router from './router'
import http from './scripts/http'
import store from './store'
import './styles/index.less'
Vue.use(modalDialog, { router })
Vue.use(ElementUI, {
    size: 'medium',
})
// svg-icon 组件
const SvgIcon = function() {
    return import(/* webpackChunkName: "low-priority" */ '@/components/SvgIcon/index.vue')
}

Vue.component('SvgIcon', SvgIcon)
Vue.prototype.$http = http

initShareGood()

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'

async function bootstrap() {
    const { token } = getURLParameters(location.href)
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
