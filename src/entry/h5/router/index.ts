import NotFound from '@/views/404/index.vue'
import { createBaseRouter } from '@@core/common/router'
import { setupRouterGuard } from '@@core/common/router/utils/guard'
import Vue from 'vue'

const { mode } = require('../settings.js')

const { routerInstance, routes, flatRoutes } = createBaseRouter(Vue, require.context(`../views`, true, /router\.js/), {
    mode,
    notFoundLayout: NotFound,
})
console.log(routes)

setupRouterGuard(routerInstance)

export { routes, flatRoutes }

export default routerInstance
