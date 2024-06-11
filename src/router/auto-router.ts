interface Raw {
    [propName: string]: any
}

class RouteProvider {
    /**
     * 自动生成路由的目录
     * @type {Array}
     * @private
     */
    routes: any = []
    requireContext: any = null

    constructor(requireContext: any) {
        this.requireContext = requireContext
        this.init()
    }
    init() {
        const modules: Raw = {}
        const routes: Array<any> = []

        // 获取除了路由以外的vue文件
        const requireAll = (context: any) => {
            context.keys().forEach((key: any) => {
                if (key.indexOf('router.js') > -1) {
                    const route = this.requireContext(key).default
                    modules[key] = route
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
    getRoutes() {
        return [...this.routes]
    }
    addRoutes(routes: any[]) {
        const names = routes.map(item => item.name)
        const result: any = []
        this.routes.forEach((item: any, index: number) => {
            if (names.includes(item.name)) {
                result.push(index)
            }
        })
        result.reverse().forEach((index: any) => {
            this.routes.splice(index, 1)
        })
        console.log(result)

        this.routes.push(...routes)
    }
    // 路由是否需要自动导入 默认true
    isAuto(route: any) {
        if (route.meta && route.meta.auto === false) {
            return false
        } else {
            return true
        }
    }
    // auto 是否自动组装成树级菜单
    generate(isToTree = true) {
        const routes = [...this.routes]
        let result: any = []
        if (isToTree) {
            const map: any = {}
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
                const { parent } = pop.meta
                if (parent) {
                    const target = map[parent]
                    if (target) {
                        target.children = target.children || []
                        target.children.push(pop)
                    } else {
                        console.warn(`[异常] ${pop.path} 未找到父组件name:${parent}`)
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

export default RouteProvider
