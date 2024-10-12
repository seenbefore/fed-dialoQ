declare type Obj<K extends keyof any = string, T = any> = {
    [P in K]: T
}

declare type Nullable<T> = T | null

declare type UndefinedAble<T> = T | undefined

declare type NUAble<T> = T | undefined | null

declare interface ICustomBreadcrumbItem {
    label: string
    path?: string
    query?: Obj
}

declare interface Window {
    webkitDevicePixelRatio?: number
    mozDevicePixelRatio?: number
    /* 打开文件夹，获取文件夹的句柄 */
    showDirectoryPicker?: () => Promise<any>
    eruda?: {
        init: () => void
    }
}

// declare type IQueryParams<T> = Required<Parameters<T>>[number] // import { ExAxiosRequestConfig } from 'icinfo-request'
declare type IQueryParams<T> = Omit<Required<Parameters<T>>[number], import('icinfo-request').ExAxiosRequestConfig>
