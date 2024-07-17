import BaseUserStore from '../../store/BaseUserStore'
import { setupBodyClassGuard, setupDesktopAuthGuard, setupAdminScrollGuard } from './guard/index'

export const registerInterceptor = <T extends BaseUserStore>(router: any, userStore?: T): void => {
    if (router._registerInterceptor) return
    router._registerInterceptor = true

    userStore && setupDesktopAuthGuard(router, userStore)
    setupBodyClassGuard(router)
    setupAdminScrollGuard(router)
}
