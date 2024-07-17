import router from '../router'
import { tagsViewStore } from '../store/useStore'

export async function goBack($route: any, reload = false) {
    const query = $route.query || {}
    const { name = '', from = '' } = query
    await tagsViewStore.delView($route)
    // 如果上一页有缓存 保存或修改动作需要更新下上一页的缓存 也可以在上一页路由.meta.noCache=true 这样就不需要这个代码
    if (reload) {
        await tagsViewStore.delCachedView({
            name, // 上一页的路由名称
        })
    }
    router.push(from)

    //window.history.go(-1)
}
export async function go($route: any, options: any) {
    const { path, query } = options
    router.push({
        path,
        query: {
            ...query,
            // name: $route.name,
            // from: $route.fullPath,
        },
    })
}
export function open(options: any) {
    const { path, query } = options
    let routeUrl = router.resolve({
        path,
        query,
    })
    window.open(routeUrl.href, '_blank')
}
