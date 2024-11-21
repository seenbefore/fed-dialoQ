/* eslint-disable */
const CaseSortSave = () => import(/* webpackChunkName: "CaseSortSave" */ './index.vue')
export default {
    path: '/file-review/case-sort/save/:step?',
    name: 'CaseSave',
    component: CaseSortSave,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '保存卷宗',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
        activeMenu: '/file-review/case-sort',
    },
}
