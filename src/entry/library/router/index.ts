import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import NotFound from '../views/404/index.vue'
import AutoRouteGenerator from '@/router/auto-router'
import { setupBodyClassGuard, setupBodyScrollGuard } from '@/router/guard'

const generator = new AutoRouteGenerator(require.context(`../views`, true, /router\.js/))
const autoRoutes = generator.generate()
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
})

setupBodyClassGuard(router)
setupBodyScrollGuard(router)

export default router
