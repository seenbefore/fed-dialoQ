export * from './base'
export * from './menu'
export * from './UserInfo'

export interface ErrorInfo {
    /**
     * 错误属性
     */
    field: string

    /**
     * 错误信息
     */
    info: string
}

export interface Result<T> {
    /**
     * 返回编码.200=成功
     */
    code: number

    /**
     * 返回信息
     */
    message: string

    /**
     * 返回数据
     */
    data: T

    /**
     * 错误信息
     */
    errors: ErrorInfo[]
}
export interface PageResponse<T> {
    /**
     * 表头数组
     */
    tableHeadArray: string[]

    /**
     * 过滤后的记录数
     */
    recordsFiltered: string

    /**
     * 返回的分页数据对象
     */
    data: T[]

    /**
     * 请求次数计数器
     */
    draw: number

    /**
     * 错误提示信息
     */
    error: string

    /**
     * 总记录数
     */
    recordsTotal: string

    /**
     * 表头
     */
    tableHead: any
}
