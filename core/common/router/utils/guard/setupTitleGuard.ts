import VueRouter from 'vue-router'

export function setupTitleGuard(router: VueRouter) {
    router.afterEach((to: any) => {
        let { title } = to
        title = typeof title === 'function' ? title(to) : title

        document.title = title
    })
}
