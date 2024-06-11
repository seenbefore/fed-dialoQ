import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import NotFound from '@/views/404/index.vue'
import AutoRouteGenerator from '@/router/auto-router'
import scrollBehavior from '@/router/scrollBehavior'
import { setupRouterGuard } from './guard'

const generator = new AutoRouteGenerator(require.context(`../views`, true, /router\.js/))
const autoRoutes = generator.generate(true)
console.log('所有路由', autoRoutes)
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    ...autoRoutes,
    // {
    //     path: '/',
    //     redirect: '/work-platform',
    // },
    {
        path: '*',
        component: NotFound,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior,
})

setupRouterGuard(router)

export default router
