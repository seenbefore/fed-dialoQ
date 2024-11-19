/* eslint-disable */
const CaseSort = () => import(/* webpackChunkName: "CaseSort" */ './index.vue')
export default {
    path: '/file-review/case-sort',
    name: 'CaseSort',
    component: CaseSort,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '卷宗整理',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
