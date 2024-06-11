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
import { LocalMenu } from '@/entry/third/menus'
import { http } from './scripts/http'
import { getUserInfo } from '@/entry/third/services/auto/system'
import '@/bus'
// import IcinfoUI from 'icinfo-ui'
// import 'icinfo-ui/lib/theme-chalk/index.css'
// Vue.use(IcinfoUI)
// 初始化用户配置
userStore.set(user)
Vue.use(modalDialog, { store, router })
Vue.prototype.$http = http
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
        paramsSerializer(params: any = {}) {
            const result: any = {}
            result.length = params.pageSize || 10
            result.pageNum = params.page || 1
            result.start = (result.page - 1) * result.length
            //result.aaa = 111
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
            //layout: 'total, sizes, prev, next',
            // 'prev-text': '上一页',
            // 'next-text': '下一页',
        },
    },
}

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'
/* 全局混入 Vue.mixin */
Vue.mixin({
    methods: {
        /**
         * @desc 新开页面跳转
         * @param {路由地址} path
         * @param {路由参数} query
         */
        openNewPage(path: string, query: any) {
            const { href } = this.$router.resolve({
                path,
                query,
            })
            window.open(href, '_blank')
        },
    },
})
/* 条件编译 (必须是运行时可用的环境变量，并且变量值不能为 undefined，否则模块必定会打包) */
if (process.env.VUE_APP_MOCK === 'true' || process.env.VUE_APP_ENV === 'fat1') {
    //require('./mock')
}
async function bootstrap() {
    let error: any
    // 本地调试的时候 加载全量菜单 可删除
    if (process.env.NODE_ENV === 'development') {
        userStore.setPermissionMenus(LocalMenu)
    }

    const { hnxw_ssid = '' } = getURLParameters(location.href)
    /**
     * 地址： http://localhost:8080/admin/product/list?isThirdParty=1&from=ks&action=AUTO_LOGIN&user={"name":"超级管理员","username":"superAdmin","phone":"18868876270","email":"superAdmin@qq.com","sex":1}
     * 参数 action 并且等于'AUTO_LOGIN' 则自动登录
     * 参数 user JSON.strigify后的数据 必须包含 username 和 name
     * 参数 isThirdParty 值随意 隐藏头部和左侧菜单
     * 参数 from 来源 其他平台名称
     */
    if (hnxw_ssid) {
        userStore.login(hnxw_ssid)
    }
    userStore.set({
        TokenName: 'hnxw_ssid',
    })
    userStore.setPermissionMenus(LocalMenu)

    try {
        // 获取用户信息
        const { data } = await getUserInfo({}, { timeout: 3 * 1000 })

        userStore.setUserInfo({
            name: data.realName,
            sex: 1,
            ...data,
        })
    } catch (err) {
        const e = err as any
        error = e
    }

    // 在iframe中则只显示页面 不显示菜单
    try {
        if (window.top === window) {
            console.log('页面不在 iframe 中')
            settings.isThirdParty = false
        } else {
            settings.isThirdParty = true
        }
    } catch (error) {
        console.log(error)

        settings.isThirdParty = false
    }

    settingsStore.changeSetting(settings)

    const app = new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}

bootstrap()
