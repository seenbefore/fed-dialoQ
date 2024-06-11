import Vue from 'vue'
import 'normalize.css'
// 项目的全局组件 指令、混入等
import '@/components/registerAdminComp'
import '@/components/registerGlobalComp'
// 项目样式
import './styles/index.less'
// 路由
import router from './router'
// 状态管理
import store from './store'
import App from './App.vue'
import { getURLParameters } from 'icinfo-util'
import { userStore, settingsStore } from './store/useStore'
import defaultSettings from './settings'
const { settings, user } = defaultSettings
import * as utils from '@/scripts/utils'
import modalDialog from '@/scripts/ModalDialog'
// TODO 可删除
import { LocalMenu } from '@/entry/devops/menus'
import '@/components/directives/copy'
// 错误日志埋点
import './mito'

// import IcinfoUI from 'icinfo-ui'
// import 'icinfo-ui/lib/theme-chalk/index.css'
// Vue.use(IcinfoUI)
// 初始化用户配置
userStore.set(user)
Vue.use(modalDialog, { store, router })
Vue.prototype.$utils = Object.freeze({ ...utils })
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.prototype.$redirect = function(uri: any) {
    if (uri === '-1') {
        this.$router.go(-1)
    } else {
        this.$router.push(uri)
    }
}
Vue.prototype.$ShareGood = {
    DataView: {
        paramsSerializer(params = {}) {
            const result = {}
            // result.pageNum = params.page || 1
            // result.length = params.pageSize || params.limit || 10
            // delete params.page
            // delete params.limit
            // delete params.pageSize

            return {
                ...result,
                ...params,
            }
        },
        // 不需要打印和导出
        pageActionLayout: [
            {
                key: 'export',
                label: '导出',
            },
        ],
        pagination: {
            page: 1,
            pageSize: 10,
            pageSizes: [10, 20, 50, 100, 200, 1000],
            layout: 'sizes,total,slot,->,prev, pager, next, jumper ',
        },
    },
}

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'
/* 条件编译 (必须是运行时可用的环境变量，并且变量值不能为 undefined，否则模块必定会打包) */
if (process.env.VUE_APP_MOCK === 'true') {
    require('./mock')
}
async function bootstrap() {
    // 本地调试的时候 加载全量菜单 可删除
    if (process.env.NODE_ENV === 'development') {
        userStore.setPermissionMenus(LocalMenu)
    }
    const { isThirdParty } = getURLParameters(location.href)

    // 此处添加获取全局配置等异步操作
    settings.isThirdParty = isThirdParty ? true : settings.isThirdParty
    settingsStore.changeSetting(settings)

    const app = new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}

bootstrap()
