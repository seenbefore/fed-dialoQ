// 项目的全局组件 指令、混入等
import '@/components/registerAdminComp'
import { LocalMenu } from '@/menus'
// 弹窗插件
import modalDialog from '@/scripts/ModalDialog'
import { getURLParameters } from 'icinfo-util'
import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
import defaultSettings from './settings'
// 状态管理
import store from './store'
import { settingsStore, userStore } from './store/useStore'
// 项目样式
import './styles/index.less'
Vue.use(modalDialog, { store, router })
const { settings, user } = defaultSettings

userStore.set(user)

// 配置全局组件
Vue.prototype.$ShareGood = {
    uploader: {},
    // 表格
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
        // 不需要打印和导出
        pageActionLayout: [],
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
// 配置全局风格
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'

async function bootstrap() {
    // 本地调试的时候 加载全量菜单 可删除
    if (process.env.NODE_ENV === 'development') {
        userStore.setPermissionMenus(LocalMenu)
    }
    // 嵌入第三方免登进入
    const { token = '' } = getURLParameters(location.href)
    if (token) {
        userStore.clear()
        userStore.login(decodeURIComponent(token))
    }
    // 此处添加获取全局配置等异步操作
    settings.isThirdParty = location.href.indexOf('isThirdParty') > -1
    settingsStore.changeSetting(settings)
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}

bootstrap()
