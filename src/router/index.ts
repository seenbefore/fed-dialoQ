/**
 * 路由权限控制方式：beforeEach | addRoutes | 两者结合
 * 这里封装了 addRoutes 方式，即 resetRoutes 与 filterMapRoutes
 */
import NotFound from '@/components/NotFound/index.vue'
import LAYOUT from '@/views/index/_layout.vue'
import { baseInitRouter } from '@@core/common/router'
import { userStore } from '@/store/useStore'
import Vue from 'vue'

const { routerInstance, routes, flatRoutes } = baseInitRouter(Vue, require.context(`../views`, true, /router\.js/), {
    userStore: userStore,
    notFoundLayout: LAYOUT,
    notFoundComponent: NotFound,
    mode: process.env.VUE_APP_MODE || 'history',
})

export { routes, flatRoutes }

export default routerInstance
