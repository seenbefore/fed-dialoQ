import VueRouter from 'vue-router'

// Don't change the order of creation
export function setupRouterGuard(router: VueRouter) {
    router.afterEach((to: any) => {
        let { title } = to.meta
        const { bodyClass } = to.meta
        title = typeof title === 'function' ? title(to) : title

        if (bodyClass) {
            document.body.className = bodyClass
        } else {
            document.body.className = ''
        }
    })
}
