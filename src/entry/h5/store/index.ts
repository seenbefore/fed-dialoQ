import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'
const LocalConfig = require('../settings.js')
const { key } = LocalConfig
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
                      key,
                      paths: ['app'],
                      storage: window.localStorage,
                  }),
              ]
            : [
                  createPersistedState({
                      key,
                      paths: ['app'],
                      storage: window.localStorage,
                  }),
              ],
})

export default store
