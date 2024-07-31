import Vue from 'vue'
export const initShareGood = (VueInstance: typeof Vue) => {
    VueInstance.prototype.$ShareGood = {
        DataView: {
            paramsSerializer(params = {}) {
                return {
                    ...params,
                }
            },
            // 不需要打印和导出
            pageActionLayout: [
                {
                    key: 'export',
                    label: '导出',
                },
            ],
            pagination: {
                page: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50, 100, 200, 1000],
                layout: 'sizes,total,slot,->,prev, pager, next, jumper ',
            },
        },
    }
}
