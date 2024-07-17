import { RouteConfig } from 'vue-router'

export type IRouteConfig = RouteConfig & {
    fullPath?: string
}

interface Raw {
    [propName: string]: any
}

export class RouteProvider {
    public routes: Array<IRouteConfig> = []
    public requireContext: __WebpackModuleApi.RequireContext

    public constructor(requireContext: __WebpackModuleApi.RequireContext) {
        this.requireContext = requireContext
        this.init()
    }

    public init(): void {
        const modules: Raw = {}
        const routes: Array<IRouteConfig> = []

        // 获取除了路由以外的vue文件
        const requireAll = (context: __WebpackModuleApi.RequireContext) => {
            context.keys().forEach((key: string) => {
                if (key.indexOf('router.js') > -1) {
                    modules[key] = this.requireContext(key).default
                }
            })
        }
        // 重新排序，将动态路由放在路由表尾部，最后匹配
        requireAll(this.requireContext)
        Object.values(modules)
            .sort((a, b) => {
                const _a = a.path.replace(/:/g, 'zzzzzzzzzzzzzzzzzzz')
                const _b = b.path.replace(/:/g, 'zzzzzzzzzzzzzzzzzzz')

                return _a.length - _b.length
            })
            .forEach(item => {
                if (this.isAuto(item)) {
                    routes.push(item)
                }
            })

        this.routes = [...routes]
    }

    public getRoutes(): Array<IRouteConfig> {
        return [...this.routes]
    }

    public addRoutes(routes: Array<IRouteConfig>): void {
        const names = routes.map(item => item.name)
        const result: Array<number> = []
        this.routes.forEach((item: IRouteConfig, index: number) => {
            if (names.includes(item.name)) {
                result.push(index)
            }
        })
        result.reverse().forEach((index: any) => {
            this.routes.splice(index, 1)
        })
        this.routes.push(...routes)
    }

    // 路由是否需要自动导入 默认true
    public isAuto(route: IRouteConfig): boolean {
        return !(route.meta && route.meta.auto === false)
    }

    // auto 是否自动组装成树级菜单
    public generate(isToTree = true): Array<IRouteConfig> {
        const routes = [...this.routes]
        let result: Array<IRouteConfig> = []
        if (isToTree) {
            const map: Obj<string, IRouteConfig> = {}
            routes.forEach((item: any) => {
                if (!item.name) {
                    console.warn(`[异常] ${item.path} 缺失name`)
                }
                const name = item.name || item.path
                if (!map[name]) {
                    map[name] = item
                }
            })
            while (routes.length) {
                const pop = routes.shift()
                const { parent } = pop?.meta ?? {}
                if (parent) {
                    const target = map[parent]
                    if (target) {
                        target.children = target.children || []
                        target.children.push(pop!)
                    } else {
                        console.warn(`[异常] ${pop?.path} 未找到父组件name:${parent}`)
                    }
                }
            }

            Object.keys(map).forEach(name => {
                if (!map[name]['meta']['parent']) {
                    result.push(map[name])
                }
            })
        } else {
            result = [...routes]
        }

        return result
    }
}
