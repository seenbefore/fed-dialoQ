declare type Obj<K extends keyof any = string, T = any> = {
    [P in K]: T
}

declare type Nullable<T> = T | null

declare type UndefinedAble<T> = T | undefined

declare type NUAble<T> = T | undefined | null

declare interface Window {
    eruda?: {
        init: () => void
    }
}
