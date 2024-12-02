import '@/styles/global.less'
import '@/theme/vant'
import { mobileInit } from '@@core/common/configurations/initConfig/mobileInit'
import { getURLParameters } from 'icinfo-util'
import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import './components'
import router from './router'
import http from './scripts/http'
import modalDialog from './scripts/MobileModalDialog'
import store from './store'
import './styles/app.less'
import { tagsViewStore } from '@h5/store/useStore'

Vue.prototype.$modalDialog = modalDialog
Vue.prototype.$http = http
/**
 * 页面回退，默认重新加载上一页
 */
Vue.prototype.$back = async function(reload = true) {
    const visitedViews = tagsViewStore.visitedViews
    // 上一页内容
    const lastView = visitedViews[visitedViews.length - 2]

    if (lastView) {
        if (reload) {
            await tagsViewStore.delCachedView({
                name: lastView.name,
            })
        }
    }
    this.$router.go(-1)
}

const { bootstrap } = mobileInit(Vue)

bootstrap(async () => {
    /* 嵌入第三方免登进入 */
    const { token = '' } = getURLParameters(location.href)

    if (token) {
        // TODO set token or get userInfo
    }
}).then(mount => mount({ store, router, App }))
