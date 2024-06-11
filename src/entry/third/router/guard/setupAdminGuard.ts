import VueRouter from 'vue-router'
import { userStore } from '../../store/useStore'

export function setupAdminAuthGuard(router: VueRouter) {
    router.beforeEach(async (to, from, next) => {
        if (to.path === '' || to.path === '/') {
            // 已登录默认跳转第一个菜单
            if (userStore.defaultPath) {
                next({
                    path: userStore.defaultPath,
                    replace: true,
                })
            } else {
                next()
            }
        } else {
            next()
        }
    })
}

export function setupAdminScrollGuard(router: VueRouter) {
    router.afterEach(to => {
        try {
            const meta = to.meta || {}
            const keepAlive = meta.keepAlive

            const appMain$ = document.getElementById('appMain') as HTMLElement
            if (appMain$ && !keepAlive) {
                appMain$.scrollTop = 0
            }
        } catch (err) {
            console.error(err)
        }
    })
}
