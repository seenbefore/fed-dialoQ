const CaseSearch = () => import(/* webpackChunkName: "CaseSearch" */ './index')

export default {
    path: '/file-review/case-search',
    name: 'CaseSearch',
    component: CaseSearch,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '卷宗查询',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
