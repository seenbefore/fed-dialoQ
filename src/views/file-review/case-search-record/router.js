/* eslint-disable */
const CaseSearchRecord = () => import(/* webpackChunkName: "CaseSearchRecord" */ './index.vue')
export default {
    path: '/file-review/case-search-record',
    name: 'CaseSearchRecord',
    component: CaseSearchRecord,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '卷宗查询记录',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
