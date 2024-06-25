import store from './index'
import { getModule } from 'vuex-module-decorators'
import userModule from './modules/user'
import appModule from './modules/app'
import settingsModule from './modules/settings'
import tagsViewModule from './modules/tagsView'
export const userStore = getModule(userModule, store)
export const appStore = getModule(appModule, store)
export const settingsStore = getModule(settingsModule, store)
export const tagsViewStore = getModule(tagsViewModule, store)

export type StoreType = {
    userStore: typeof userStore
    appStore: typeof appStore
    settingsStore: typeof settingsStore
    tagsViewStore: typeof tagsViewStore
}
