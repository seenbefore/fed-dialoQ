/* eslint-disable */
const CaseSave = () => import(/* webpackChunkName: "CaseSave" */ './index.vue')
export default {
    path: '/file-review/my-case/step2',
    name: 'CaseSave',
    component: CaseSave,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '保存卷宗目录',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
        activeMenu: '/file-review/my-case',
    },
}
