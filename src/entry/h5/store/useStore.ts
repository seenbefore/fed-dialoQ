import UserModule from './modules/user'
import { getModule } from 'vuex-module-decorators'
import appModule from './modules/app'
import tagsViewModule from './modules/tagsView'
import store from './index'
export const appStore = getModule(appModule, store)
export const tagsViewStore = getModule(tagsViewModule, store)
export const userStore = getModule(UserModule, store)
export type StoreType = {
    appStore: typeof appStore
    tagsViewStore: typeof tagsViewStore
    userStore: typeof userStore
}
