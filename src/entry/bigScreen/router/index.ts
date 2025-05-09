/**
 * 路由权限控制方式：beforeEach | addRoutes | 两者结合
 * 这里封装了 addRoutes 方式，即 resetRoutes 与 filterMapRoutes
 */

import { createBaseRouter } from '@@core/common/router'
import { setupRouterGuard } from '@@core/common/router/utils/guard'
import Vue from 'vue'

const { mode } = require('../settings.js')

const { routerInstance, routes, flatRoutes } = createBaseRouter(Vue, require.context(`../views`, true, /router\.js/), {
    mode,
    routes: {
        path: '/:path(.*)*',
        redirect: '/',
    },
})

setupRouterGuard(routerInstance)

export { routes, flatRoutes }

export default routerInstance
