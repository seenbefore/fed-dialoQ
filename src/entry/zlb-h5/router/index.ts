import { createBaseRouter } from '@@core/common/router'
import { RouterMode } from '@@core/common/router/utils/enum'
import { setupRouterGuard } from '@@core/common/router/utils/guard'
import { addKeepAlive } from './guard/addKeepAlive'
import Vue from 'vue'

const { routes, routerInstance, flatRoutes } = createBaseRouter(Vue, require.context(`../views`, true, /router\.js/), {
    mode: RouterMode.HASH,
    routes: {
        path: '*',
        redirect: '/404',
    },
})

addKeepAlive(routerInstance)

setupRouterGuard(routerInstance)

export { routes, flatRoutes }

export default routerInstance
