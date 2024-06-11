/** 后台菜单  */
export declare interface MenuMeta {
    icon?: string
    title?: string
    isExternal?: boolean
    [propName: string]: any
}

export declare interface UserMenu {
    uri?: string
    label: string
    icon?: string
    children?: UserMenu[]
    [propName: string]: any
}
export declare interface PermissionMenu {
    path: string
    meta: MenuMeta
    hidden?: boolean
    alwaysShow?: boolean
    icon: string
    children?: PermissionMenu[]
    [propName: string]: any
}

export declare interface RouteMenu {
    path: string
    meta: MenuMeta
    hidden?: boolean
    alwaysShow?: boolean
    children?: Array<RouteMenu>
    [propName: string]: any
}
