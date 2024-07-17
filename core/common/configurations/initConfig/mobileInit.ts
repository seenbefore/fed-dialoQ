import { createVueApp } from './utils/createVueApp'
import { isFunction } from 'lodash'
import Vue from 'vue'

export const mobileInit = (VueInstance: typeof Vue) => {
    Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'

    const bootstrap = async (callback?: () => Promise<any> | any) => {
        /* pre init */
        if (callback && isFunction(callback)) {
            await callback()
        }

        return createVueApp(VueInstance).create
    }

    return {
        bootstrap,
    }
}
