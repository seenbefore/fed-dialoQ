/**
 * 路由权限控制方式：beforeEach | addRoutes | 两者结合
 * 这里封装了 addRoutes 方式，即 resetRoutes 与 filterMapRoutes
 */

import NotFound from '@/components/NotFound/index.vue'
import { setupAdminScrollGuard, setupBodyClassGuard } from '@/router/guard'

import scrollBehavior from '@/router/scrollBehavior'
import Vue from 'vue'
import VueRouter from 'vue-router'
import LAYOUT from '../views/index/_layout.vue'
import { setupAdminAuthGuard } from './guard/setupAdminGuard'
import routes from './routes'

Vue.use(VueRouter)

const { mode } = require('../settings.js')
const base = mode === 'hash' ? '/' : process.env.BASE_URL
const router = new VueRouter({
    mode: 'history',
    base,
    routes: [
        ...routes,
        {
            path: '/:path(.*)*',
            component: LAYOUT,
            children: [
                {
                    path: '/:path(.*)*',
                    component: NotFound,
                },
            ],
        },
    ],
    scrollBehavior,
})
setupAdminAuthGuard(router)
setupBodyClassGuard(router)
setupAdminScrollGuard(router)

export default router
