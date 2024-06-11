import 'normalize.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import store from './store'
// 全局组件
import '@/components/registerGlobalComp'
import '@/sharegood-ui'
import router from './router'
import App from './App.vue'
import http from './scripts/http'
import './styles/index.less'
import modalDialog from '@/scripts/ModalDialog'
import { appStore } from './store/useStore'
const LocalConfig = require('./settings.js')
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

Vue.prototype.$ShareGood = {
    uploader: {},
    DataView: {
        paramsSerializer(params: any = {}) {
            const result: any = {}
            result.pageNum = params.page || 1
            result.length = params.pageSize || params.limit || 10
            delete params.page
            delete params.limit
            delete params.pageSize

            return {
                ...result,
                ...params,
            }
        },
        pagination: {
            page: 1,
            pageSize: 10,
            pageSizes: [10, 20, 50, 100, 200],
            layout: 'sizes,total,slot,->,prev, pager, next, jumper ',
            //layout: 'total, sizes, prev, next',
            // 'prev-text': '上一页',
            // 'next-text': '下一页',
        },
    },
}

async function bootstrap() {
    appStore.setApps(LocalConfig.settings.apps)
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}

bootstrap()
