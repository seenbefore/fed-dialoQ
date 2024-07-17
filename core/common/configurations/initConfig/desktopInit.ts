import { createVueApp } from './utils/createVueApp'
import { isFunction } from 'lodash'
import Vue from 'vue'
import { initShareGood } from './initShareGood'
/* 导入主题库 */
import 'icinfo-ui/lib/theme-chalk/index.css'

/* 初始化一些配置 */
export const desktopInit = (VueInstance: typeof Vue) => {
    // 配置全局组件
    initShareGood()
    // 配置全局风格
    VueInstance.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
    /* add redirect route */
    VueInstance.prototype.$redirect = function(uri: any) {
        if (uri === '-1') {
            this.$router.go(-1)
        } else {
            this.$router.push(uri)
        }
    }

    /* 控制开发模式的开关 */
    VueInstance.config.devtools = process.env.VUE_APP_ENV === 'dev'

    /* 在初始化之前做一些操作 */
    const bootstrap = async (callback?: () => Promise<any> | any) => {
        /* init page */
        if (callback && isFunction(callback)) {
            await callback()
        }

        return createVueApp(VueInstance).create
    }

    return {
        bootstrap,
    }
}
