import { PermissionMenu, UserMenu } from '@/@types/menu'
import { isExternalPath, isSubAppPath } from '@/scripts/utils'

/**
 * 将用户菜单转化为侧边栏权限菜单
 */
export const generatePermissionMenu = function(menus: UserMenu[]): PermissionMenu[] {
    const loop = (curRoutes: UserMenu[]) =>
        curRoutes.map((menu: UserMenu) => {
            let { uri, label, icon, children } = menu
            const newMenu = {} as PermissionMenu
            let isExternal = false
            let path = uri || menu.url || `/${guid()}`
            const title = label || menu.menuName || menu.title || '未定义'

            if (path) {
                if (isSubAppPath(path)) {
                    const origin = encodeURIComponent(path)
                    path = '/sub-app/' + origin
                } else if (isExternalPath(path)) {
                    isExternal = true
                }
            }
            if (path === '#') {
                path = `/${guid()}`
            }

            newMenu.path = path
            newMenu.meta = {
                title,
                icon,
                isExternal,
            }

            if (children) {
                newMenu.alwaysShow = true
                newMenu.children = loop(children)
            }
            return newMenu
        })
    return loop(menus)
}

// 递归每个路由，如果有子节点则跳转到第一个子节点
export const generateRedirectRoutes = function(tree: any) {
    const stack = [...tree]
    const routes = []
    while (stack.length) {
        const pop = stack.shift()
        if (pop.children && pop.children.length) {
            let targetIndex = -1
            pop.children.some((item: any, index: any) => {
                if (item.hidden === false || !item.hidden) {
                    targetIndex = index
                    return true
                }
                return false
            })
            if (targetIndex > -1) {
                routes.push({
                    path: pop.path,
                    redirect: pop.children[targetIndex].path,
                })
            }

            stack.unshift(...pop.children)
        }
    }
    return routes
}

/**
 * 获取叶子菜单地址
 */
export const getIndexUri = function(menus: Array<UserMenu | PermissionMenu>): string {
    const stack = [...menus]
    let result = ''
    while (stack.length) {
        const pop = stack.shift()
        if (pop) {
            if (pop.children) {
                stack.unshift(...pop.children)
            }
            if (!pop.children && pop.uri) {
                result = pop.uri
                break
            }
            if (!pop.children && pop.path) {
                result = pop.path
                break
            }
            if (!pop.children && pop.url) {
                result = pop.url
                break
            }
        }
    }
    return result
}
/**
 * 将一级路由根据关系重组并设定 / 的默认路由
 */
export const generateRoutes = function(list: any, defaultPath?: any) {
    const map: any = {}

    list.forEach((item: any) => {
        if (!map[item.name]) {
            map[item.name] = item
        }
    })

    const result: any = []
    list.forEach((item: any, index: any) => {
        const { meta } = item
        item.meta = item.meta || {}
        const parentName = meta.parent || ''
        if (parentName) {
            if (map[parentName]) {
                map[parentName].children ? map[parentName].children.push(item) : (map[parentName].children = [item])
            }
        }
    })

    Object.keys(map).forEach(name => {
        if (!map[name]['meta']['parent']) {
            result.push(map[name])
        }
    })
    // TODO
    result.forEach((item: any) => {
        if (item.children && item.children.length) {
            item.redirect = defaultPath || item.children[0]['path']
        }
    })
    return result
}

export const hasMenuPermission = function(menus: any, router: any) {
    const { meta = {}, path } = router
    if (path.indexOf('/sub-app/') > -1) {
        return true
    }
    if (meta.requireAuth) {
        const target = findUserMenu(menus, path)
        if (!target) {
            return false
        }
    }
    return true
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

function findUserMenu(LocalMenus: Array<UserMenu>, path: string): UserMenu | null {
    const stack = [...LocalMenus]
    let result = null
    while (stack.length) {
        const pop = stack.shift()
        if (pop && pop.children) {
            stack.unshift(...pop.children)
        }
        if (pop && pop.uri === path) {
            result = {
                ...pop,
            }
            break
        }
    }
    return result
}

export const getDefaultPathUtil = (uri: string, topMenus: Array<PermissionMenu | UserMenu>): string => {
    const topMenu = topMenus.find(item => item.path === uri)
    if (topMenu) {
        const children = topMenu?.children ?? []
        const result = getIndexUri(children)
        return result
    }
    return ''
}
