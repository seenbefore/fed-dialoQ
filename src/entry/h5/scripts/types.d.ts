export interface MyListRef {
    /**
     * 列表数据
     */
    listData: any[]
    /**
     * 加载请求列表数据
     */
    reload: (item?: any) => Promise<any>
    /**
     * 重置列表状态
     */
    reset: () => void
}
