interface Todo {
    title: string
    description: string
    completed: boolean
}
export type AnyType<T> = {
    [P in keyof T]: T[P]
} & {
    [key: string]: any
}
/**
 * Make all properties in T optional
 */
export type PartialType<T> = {
    [P in keyof T]?: T[P]
}

/**
 * Make all properties in T readonly
 */
export type ReadonlyType<T> = {
    readonly [P in keyof T]: T[P]
}

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type PickType<T, K extends keyof T> = {
    [P in K]: T[P]
}

/**
 * Construct a type with a set of properties K of type T
 */
export type RecordType<K extends keyof any, T> = {
    [P in K]: T
}

/**
 * Exclude from T those types that are assignable to U
 */
export type ExcludeType<T, U> = T extends U ? never : T

/**
 * Construct a type with the properties of T except for those in type K.
 */
export type OmitType<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
