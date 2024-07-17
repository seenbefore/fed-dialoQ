import { getModule } from 'vuex-module-decorators'
import store from './index'
import appModule from './modules/app'
import logStoreModule from './modules/log'
import tagsViewModule from './modules/tagsView'

export const appStore = getModule(appModule, store)
export const tagsViewStore = getModule(tagsViewModule, store)
export const logStore = getModule(logStoreModule, store)
export type StoreType = {
    appStore: typeof appStore
    tagsViewStore: typeof tagsViewStore
    logStore: typeof logStore
}
