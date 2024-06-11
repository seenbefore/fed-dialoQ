import { EXECUTE_ENV_JUDGE } from '@zlb-h5/scripts/utils'
import { appStore } from '@zlb-h5/store/useStore'
import VueRouter from 'vue-router'

export const addKeepAlive = (router: VueRouter) => {
    router.afterEach(to => {
        const { keepAlive, title } = to.meta
        if (to.name) {
            if (keepAlive) {
                appStore.SET_VIEW_ALIVE(to.name)
            } else {
                appStore.REMOVE_VIEW_DIE(to.name)
            }
        }
        if (title) {
            EXECUTE_ENV_JUDGE.isZLB() ? ZWJSBridge.setTitle({ title }) : (document.title = title)
        }
    })
}
