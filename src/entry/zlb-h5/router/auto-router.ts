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
        //this.routes = this.generateRoutes(requireContext, auto)
    }
    init() {
        const modules: Raw = {}
        const routes: Array<any> = []

        // 获取除了路由以外的vue文件
        const requireAll = (context: any) => {
            context.keys().forEach((key: any) => {
                if (key.indexOf('router.js') > -1) {
                    modules[key] = this.requireContext(key).default || this.requireContext(key)
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

        this.routes = routes
    }
    isAuto(route: any) {
        if (route.meta && route.meta.auto === false) {
            return false
        } else {
            return true
        }
    }
    // auto 是否自动组装成树级菜单
    generate(isToTree = true) {
        const routes = this.routes
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
                const pop = routes.pop()
                const { parent } = pop.meta
                if (parent) {
                    const target = map[parent]
                    if (target) {
                        target.children = target.children || []
                        target.children.push(pop)
                        // const index = routes$.indexOf(pop)
                        // routes$.splice(index, 1)
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
            // todo 目前只支持三级
            result.forEach((item: any) => {
                if (item.children && item.children.length) {
                    if (item.children.filter((item: any) => item.path === '').length === 0) {
                        item.redirect = item.redirect || item.children[0]['path']
                    }

                    const result = item.children
                    result.forEach((item: any) => {
                        if (item.children && item.children.length) {
                            item.redirect = item.redirect || item.children[0]['path']
                        }
                    })
                }
            })
        } else {
            result = [...routes]
        }

        return result
    }

    // /**
    //  * 根据目录生成路由对象的数组，供vue-router使用（routes选项）
    //  * @param {Function} filterCallback
    //  * @return {Array}
    //  */
    // generate(
    //     filterCallback = function () {
    //         return true
    //     },
    // ) {
    //     return this.filterMapRoutes(filterCallback)
    // }
    filterMapRoutes(filterCallback: any) {
        const routes = this.routes
        const loop = (curRoutes: any) =>
            curRoutes
                .filter((route: any) => filterCallback(route.meta || {}, route))
                .map((route: any) => {
                    const { children, ...newRoute } = route
                    if (children) newRoute.children = loop(children)
                    return newRoute
                })
        return loop(routes)
    }
}

export default RouteProvider
