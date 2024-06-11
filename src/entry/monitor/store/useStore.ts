import store from './index'
import { getModule } from 'vuex-module-decorators'

import appModule from './modules/app'

export const appStore = getModule(appModule, store)
