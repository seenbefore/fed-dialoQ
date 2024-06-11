import { addKeepAlive } from '@zlb-h5/router/guard/addKeepAlive'
import AutoRouteGenerator from '@/router/auto-router'
import scrollBehavior from '@/router/scrollBehavior'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { setupRouterGuard } from './guard'

const generator = new AutoRouteGenerator(require.context(`../views`, true, /router\.js/))
const autoRoutes = generator.generate(true)
console.log('所有路由', autoRoutes)
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [...autoRoutes]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        ...routes,
        {
            path: '*',
            redirect: '/404',
        },
    ],
    scrollBehavior,
})

addKeepAlive(router)

setupRouterGuard(router)

export default router
