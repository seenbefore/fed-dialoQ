/* eslint-disable */
const CaseSave = () => import(/* webpackChunkName: "CaseSave" */ './index.vue')
export default {
    path: '/file-review/my-case/save/:step?',
    name: 'CaseSave',
    component: CaseSave,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '保存卷宗封面',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
        activeMenu: '/file-review/my-case',
        noCache: true,
    },
}
