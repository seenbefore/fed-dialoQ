import { registerInterceptor } from './utils/registerInterceptor'
import { IRouteConfig } from './utils/RouteProvider'
import BaseUserStore from '../store/BaseUserStore'
import { isArray } from 'lodash'
import Vue, { AsyncComponent, ComponentOptions } from 'vue'
import VueRouter from 'vue-router'
import { RouterMode } from './utils/enum'
import { RouteProvider } from './utils/RouteProvider'
import scrollBehavior from './utils/scrollBehavior'

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent

export interface ICreateBaseRouterConfig {
    mode?: RouterMode
    base?: string
    notFoundComponent?: Component
    notFoundLayout?: Component
    userStore?: BaseUserStore
    routes?: Array<IRouteConfig> | IRouteConfig
}

export interface IRouterReturn {
    /* 生成的路由 */
    flatRoutes: Array<IRouteConfig>
    /* 生成的路由 */
    routes: Array<IRouteConfig>
    /* Router 实例 */
    routerInstance: VueRouter
}

const getDefaultConfig = (): Partial<ICreateBaseRouterConfig> => {
    return {
        mode: RouterMode.HISTORY,
    }
}

export const createBaseRouter = (VueInstance: typeof Vue, requireContext: __WebpackModuleApi.RequireContext, config?: ICreateBaseRouterConfig): IRouterReturn => {
    VueInstance.use(VueRouter)
    const generator = new RouteProvider(requireContext)
    const generateRoutes = generator.generate(true)
    const defaultConfig = getDefaultConfig()
    const baseConfig = config ? { ...defaultConfig, ...config } : defaultConfig
    const { mode, base, notFoundComponent, notFoundLayout, routes: defaultRoutes } = baseConfig
    const currentBase = base ? base : mode === RouterMode.HASH ? '/' : process.env.BASE_URL
    const routes = [...generateRoutes]
    const layout: Nullable<IRouteConfig> = notFoundLayout ? { path: '/:path(.*)*', component: notFoundLayout, children: [] as Array<IRouteConfig> } : null
    if (layout) {
        if (notFoundComponent) {
            layout.children = [
                {
                    path: '/:path(.*)*',
                    component: notFoundComponent,
                },
            ]
        }
        routes.push(layout)
    }
    if (defaultRoutes) {
        routes.push(...(isArray(defaultRoutes) ? defaultRoutes : [defaultRoutes]))
    }
    const flatRoutes = generator.getRoutes()
    const routerInstance = new VueRouter({
        mode,
        base: currentBase,
        routes,
        scrollBehavior,
    })

    return {
        flatRoutes,
        routes: generateRoutes,
        routerInstance,
    }
}

export const baseInitRouter = (VueInstance: typeof Vue, requireContext: __WebpackModuleApi.RequireContext, config?: ICreateBaseRouterConfig): IRouterReturn => {
    const result = createBaseRouter(VueInstance, requireContext, config)
    registerInterceptor(result.routerInstance, config?.userStore)
    return result
}
