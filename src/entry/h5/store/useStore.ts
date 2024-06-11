import store from './index'
import { getModule } from 'vuex-module-decorators'
import appModule from './modules/app'
import tagsViewModule from './modules/tagsView'
export const appStore = getModule(appModule, store)
export const tagsViewStore = getModule(tagsViewModule, store)
export type StoreType = {
    appStore: typeof appStore
    tagsViewStore: typeof tagsViewStore
}
