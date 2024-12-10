import Vue from 'vue'
import { deepMerge } from '@/utils/merge'
export const initShareGood = (VueInstance: typeof Vue, config: any = {}) => {
    const defaultConfig = {
        DataView: {
            paramsSerializer(params: { pageSize?: number; page?: number } = {}) {
                const { page, pageSize, ...reset } = params
                return {
                    ...reset,
                    pageNum: page,
                    length: pageSize,
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
    const ShareGoodConfig = deepMerge(defaultConfig, config)
    console.log('ShareGoodConfig', ShareGoodConfig)

    VueInstance.prototype.$ShareGood = ShareGoodConfig
}
