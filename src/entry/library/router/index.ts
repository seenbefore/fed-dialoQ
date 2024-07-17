import { createBaseRouter } from '@@core/data/router'
import { RouterMode } from '@@core/data/router/utils/enum'
import { setupBodyClassGuard, setupBodyScrollGuard } from '@@core/data/router/utils/guard'
import Vue from 'vue'
import NotFound from '../views/404/index.vue'

const { routerInstance, routes, flatRoutes } = createBaseRouter(Vue, require.context(`../views`, true, /router\.js/), {
    mode: RouterMode.HISTORY,
    notFoundLayout: NotFound,
})

setupBodyClassGuard(routerInstance)
setupBodyScrollGuard(routerInstance)

export { routes, flatRoutes }

export default routerInstance
