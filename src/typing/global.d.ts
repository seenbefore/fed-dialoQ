declare type Obj<K extends keyof any = string, T = any> = {
    [P in K]: T
}

declare type Nullable<T> = T | null

declare type UndefinedAble<T> = T | undefined

declare type NUAble<T> = T | undefined | null

declare interface Window {
    webkitDevicePixelRatio?: number
    mozDevicePixelRatio?: number
    /* 打开文件夹，获取文件夹的句柄 */
    showDirectoryPicker?: () => Promise<any>
}
