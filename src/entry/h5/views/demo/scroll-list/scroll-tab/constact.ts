export enum ENUM_TAB {
    /** 基础 */
    BASIC = '1',
    /** 无数据 */
    NODATA = '2',
    /** 异常 */
    ERROR = '3',
}

export const o2m = (options: any[]) => {
    return options.reduce((result: any, item: any) => {
        return {
            ...result,
            [item.value]: item,
        }
    }, {})
}

export const OPT_TABS = [
    {
        value: ENUM_TAB.BASIC,
        label: '基础',
        component: () => import('./TabBasic/index.vue'),
    },
    {
        value: ENUM_TAB.NODATA,
        label: '无数据',
        component: () => import('./TabNodata/index.vue'),
    },
    {
        value: ENUM_TAB.ERROR,
        label: '异常',
        component: () => import('./TabError/index.vue'),
    },
]

export const MAP_TABS = o2m(OPT_TABS)
