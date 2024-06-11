import Vue from 'vue'

/**
 * tab-table - 接口
 */
export interface TabTableRef extends Vue {
    init: {
        (): void
    }
    search: {
        (): void
    }
    /** 其它属性 */
    [propName: string]: any
}
