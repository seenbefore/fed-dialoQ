export interface UserInfo {
    name?: string
    username?: string
    /**
     * 岗位 测试
     */
    position?: string
    /**
     * 0 无 性别 1 男 2 女
     */
    sex?: 0 | 1 | 2
    [key: string]: any
}
