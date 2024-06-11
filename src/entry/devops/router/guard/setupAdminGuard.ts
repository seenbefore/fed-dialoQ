import VueRouter from 'vue-router'
import { userStore } from '../../store/useStore'

export function setupAdminAuthGuard(router: VueRouter) {
    router.beforeEach(async (to, from, next) => {
        const meta = to.meta || {}
        // console.log('[本地用户token]', userStore.token, to.path, from.path)
        // 跳转到登录页面默认退出
        if (to.path === '/login') {
            userStore.clear()
        }

        if (to.path === '' || to.path === '/') {
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
        } else if (meta.requireAuth) {
            if (userStore.token) {
                // 已登录
                next()
            } else {
                // 未登录
                const query =
                    to.path === '/'
                        ? {}
                        : {
                              redirect: encodeURIComponent(to.fullPath),
                          }
                next({
                    path: '/login',
                    query,
                })
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
