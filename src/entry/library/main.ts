import 'normalize.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import store from './store'
// 全局组件
import './components/registerGlobComp'
import '@/components/registerGlobalComp'
// 注入 v-highlight 指令 可选
import '@/components/directives/highlight'
import '@/sharegood-ui'
import router from './router'
import App from './App.vue'
import http from './scripts/http'
import './styles/index.less'
import { appStore, userStore } from '@/entry/library/store/useStore'
import modalDialog from '@/scripts/ModalDialog'
import { getURLParameters } from 'icinfo-util'
import { UserService } from './services/user'
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
            // delete params.page
            // delete params.limit
            // delete params.pageSize

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

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'

async function bootstrap() {
    const { token } = getURLParameters(location.href)
    console.log('token', token)
    // if (token) {
    //     userStore.login(token + '')
    //     const { data } = await UserService.current()

    //     userStore.setUserInfo({
    //         name: data.name,
    //         username: data.username,
    //         phone: data.phone,
    //         role: data.role,
    //         position: data.position,
    //     })
    //     setTimeout(() => {
    //         location.replace(location.origin + location.pathname)
    //     }, 0)
    //     return
    // }

    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}

bootstrap()
