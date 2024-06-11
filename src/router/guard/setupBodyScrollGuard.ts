import VueRouter from 'vue-router'

export function setupBodyScrollGuard(router: VueRouter) {
    router.afterEach(to => {
        try {
            const meta = to.meta || {}
            const scrollToTop = meta.scrollToTop ?? true
            console.log('scrollToTop', scrollToTop, to.fullPath)
            const appMain$ = document.documentElement as HTMLElement
            if (scrollToTop) {
                appMain$.scrollTop = 0
            }
        } catch (err) {
            console.error(err)
        }
    })
}
