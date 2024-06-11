import store from './index'
import { getModule } from 'vuex-module-decorators'
import userModule from './modules/user'
import appModule from './modules/app'
export const userStore = getModule(userModule, store)
export const appStore = getModule(appModule, store)

// 所有的StateType
export type StateType = {
    userStore: typeof userStore
    appStore: typeof appStore
}
