import Vue from 'vue'
import Vuex, { createLogger, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { StateType } from './StateType'
import modules from './modules'
const LocalConfig = require('../settings.js')
const { key } = LocalConfig
Vue.use(Vuex)
/**
 * 全局唯一 Store 实例
 */
export const store: Store<StateType> = new Vuex.Store({
    strict: process.env.VUE_APP_ENV === 'dev',
    /* module 应该启用命名空间，即 namespaced: true */
    modules,
    plugins: [
        createPersistedState({
            key,
            paths: ['user'],
            storage: window.localStorage,
        }),
        // createPersistedState({
        //     key,
        //     paths: ['tagsView'],
        //     storage: window.sessionStorage,
        // }),
    ],
})

export default store
