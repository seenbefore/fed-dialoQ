import VueRouter from 'vue-router'

export function setupBodyClassGuard(router: VueRouter) {
    router.afterEach((to: any) => {
        const { bodyClass } = to.meta

        if (bodyClass) {
            document.body.className = bodyClass
        } else {
            document.body.className = ''
        }
    })
}
