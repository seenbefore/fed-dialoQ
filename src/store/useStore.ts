import store from '@/store'
import { getModule } from 'vuex-module-decorators'
import userModule from '@/store/modules/user'
import appModule from '@/store/modules/app'
import settingsModule from '@/store/modules/settings'
import tagsViewModule from '@/store/modules/tagsView'
export const userStore = getModule(userModule, store)
export const appStore = getModule(appModule, store)
export const settingsStore = getModule(settingsModule, store)
export const tagsViewStore = getModule(tagsViewModule, store)
