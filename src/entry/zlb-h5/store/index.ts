import { ZLBConfig } from '@zlb-h5/share/ZLBConfig'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'
Vue.use(Vuex)

/**
 * 全局唯一 Store 实例
 */
export const store = new Vuex.Store({
    strict: process.env.VUE_APP_ENV === 'dev',
    modules,
    plugins:
        process.env.NODE_ENV !== 'production'
            ? [
                  //createLogger(),
                  createPersistedState({
                      key: ZLBConfig.vuexKey,
                      paths: ['app'],
                      storage: window.localStorage,
                  }),
              ]
            : [
                  createPersistedState({
                      key: ZLBConfig.vuexKey,
                      paths: ['app'],
                      storage: window.localStorage,
                  }),
              ],
})

export default store
