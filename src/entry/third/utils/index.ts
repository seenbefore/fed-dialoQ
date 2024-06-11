import { tagsViewStore } from '../store/useStore'
import router from '../router'
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
/**
 * 自定义复制内容
 * @param t 复制的文本内容
 * @returns
 */
export async function textCopy(t: string) {
    // 如果当前浏览器版本不兼容navigator.clipboard
    if (!navigator.clipboard) {
        const ele = document.createElement('input')
        ele.value = t
        document.body.appendChild(ele)
        ele.select()
        document.execCommand('copy')
        document.body.removeChild(ele)
        if (!document.execCommand('copy')) {
            throw Error('复制失败')
        }
        return t
    }
    await navigator.clipboard.writeText(t)
    return t
}
