import { addWeeks } from 'date-fns'
import { useTheme } from 'icinfo-ui'
import { Component, CreateElement } from 'vue'
import { VueRouter } from 'vue-router/types/router'
import { Store } from 'vuex'
import { VuexModule } from 'vuex-module-decorators'
import Vue from 'vue'

export interface IMount {
    router: VueRouter
    store?: Store<any>
    App: Component
    mountSelector?: string
    themeStore?: VuexModule
    beforeRenderApp?: (h: CreateElement, VueInstance: typeof Vue) => void
    [key: string]: any
}

export const createVueApp = (VueInstance: typeof Vue) => {
    const create = (options: IMount) => {
        try {
            const { App, mountSelector, themeStore, beforeRenderApp, ...reset } = options
            if (!App) {
                return Promise.reject(new Error('App is required'))
            }
            const selector = mountSelector || '#app'
            const instance = new VueInstance({
                ...reset,
                render: h => {
                    /* set theme */
                    themeStore && useTheme(themeStore)
                    if (beforeRenderApp) {
                        beforeRenderApp(h, VueInstance)
                    }
                    return h(App)
                },
            })
            instance.$mount(selector)
            return Promise.resolve(instance)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    return {
        create,
    }
}
