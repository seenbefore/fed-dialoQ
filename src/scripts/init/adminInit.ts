import { initShareGood } from '@/scripts/init/initShareGood'
import modalDialog from '@/scripts/ModalDialog'
import * as utils from '@/scripts/utils'
import { getURLParameters } from 'icinfo-util'
import Vue, { Component } from 'vue'
import { VueRouter } from 'vue-router/types/router'
import { Store } from 'vuex'

export const adminInit = (store: Store<any>, router: VueRouter, settingsStore: any, userStore: any, defaultSettings: Obj) => {
    const { settings, user } = defaultSettings ?? {}

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
    initShareGood()
    Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'
    /* 条件编译 (必须是运行时可用的环境变量，并且变量值不能为 undefined，否则模块必定会打包) */
    async function bootstrap(App: Component, LocalMenu: Array<Obj>) {
        // 本地调试的时候 加载全量菜单 可删除
        if (process.env.NODE_ENV === 'development') {
            userStore.setPermissionMenus(LocalMenu)
        }
        const { isThirdParty } = getURLParameters(location.href)

        // 此处添加获取全局配置等异步操作
        settings.isThirdParty = isThirdParty ? true : settings.isThirdParty
        settingsStore.changeSetting(settings as any)
        new Vue({
            router,
            store,
            render: h => h(App),
        }).$mount('#app')
    }

    return {
        bootstrap,
    }
}
