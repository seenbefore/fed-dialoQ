import { setupBodyClassGuard, setupAdminAuthGuard, setupAdminScrollGuard } from './guard'

export default function(router: any) {
    if (router._registerInterceptor) return
    router._registerInterceptor = true

    setupAdminAuthGuard(router)
    setupBodyClassGuard(router)
    setupAdminScrollGuard(router)
}
