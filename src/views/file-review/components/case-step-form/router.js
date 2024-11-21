/* eslint-disable */
const CaseSortStep2 = () => import(/* webpackChunkName: "CaseSortStep2" */ './index.vue')
export default {
    path: '/file-review/case-sort/step2',
    name: 'CaseSortStep2',
    component: CaseSortStep2,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '保存卷内备考表',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
        activeMenu: '/file-review/case-sort',
    },
}
