import VueRouter from 'vue-router'
import BaseUserStore from '../../../store/BaseUserStore'

export function setupDesktopAuthGuard<T extends BaseUserStore>(router: VueRouter, userStore: T): void {
    router.beforeEach(async (to, from, next) => {
        const meta = to.meta || {}

        next()
        // 跳转到登录页面默认退出
        // if (to.path === '/login') {
        //     userStore.clear()
        // }

        // if (userStore.token) {
        //     if (to.path === '' || to.path === '/') {
        //         // 已登录默认跳转第一个菜单
        //         if (userStore.defaultPath) {
        //             next({
        //                 path: userStore.defaultPath,
        //                 replace: true,
        //             })
        //         } else {
        //             next()
        //         }
        //     } else {
        //         next()
        //     }
        // } else {
        //     if (meta.requireAuth) {
        //         // 未登录
        //         const query =
        //             to.path === '/'
        //                 ? {}
        //                 : {
        //                       redirect: to.path,
        //                   }
        //         next({
        //             path: '/login',
        //             query,
        //         })
        //     } else {
        //         next()
        //     }
        // }
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
