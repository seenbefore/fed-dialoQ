/**
 * 路由权限控制方式：beforeEach | addRoutes | 两者结合
 * 这里封装了 addRoutes 方式，即 resetRoutes 与 filterMapRoutes
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import scrollBehavior from '@/router/scrollBehavior'
import routes from './routes'
import NotFound from '@/components/NotFound/index.vue'
import LAYOUT from '../views/index/_layout.vue'
import { setupBodyClassGuard, setupAdminScrollGuard } from '@/router/guard'
import { setupAdminAuthGuard } from './guard/setupAdminGuard'

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
