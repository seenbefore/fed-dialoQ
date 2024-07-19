import VueRouter from 'vue-router'
import BaseUserStore from '../../../store/BaseUserStore'

export function setupDesktopAuthGuard<T extends BaseUserStore>(router: VueRouter, userStore: T): void {
    router.beforeEach(async (to, from, next) => {
        const meta = to.meta || {}
        // 跳转到登录页面默认退出
        if (to.path === '/login') {
            userStore.clear()
        }

        if (meta.requireAuth) {
            if (userStore.token) {
                if (to.path === '/' && userStore.defaultPath) {
                    next({
                        path: userStore.defaultPath,
                        replace: true,
                    })
                }
                // 已登录
                next()
            } else {
                // 未登录
                const query =
                    to.path === '/'
                        ? {}
                        : {
                              redirect: to.path,
                          }
                next({
                    path: '/login',
                    query,
                })
            }
        } else if (to.path === '' || to.path === '/') {
            // 已登录默认跳转第一个菜单
            if (userStore.defaultPath) {
                next({
                    path: userStore.defaultPath,
                    replace: true,
                })
            } else {
                // 未登录
                next({
                    path: '/login',
                    replace: true,
                })
            }
        } else {
            next()
        }
    })
}

export function setupAdminScrollGuard(router: VueRouter): void {
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
