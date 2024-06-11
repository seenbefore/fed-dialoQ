/**
 * 路由权限控制方式：beforeEach | addRoutes | 两者结合
 * 这里封装了 addRoutes 方式，即 resetRoutes 与 filterMapRoutes
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import scrollBehavior from '@/router/scrollBehavior'
import routes from './routes'
import { setupRouterGuard } from './guard'

Vue.use(VueRouter)

const { mode } = require('../settings.js')
const base = mode === 'hash' ? '/' : process.env.BASE_URL

const router = new VueRouter({
    mode,
    base,
    routes: [...routes],
    scrollBehavior,
})

setupRouterGuard(router)

export default router
