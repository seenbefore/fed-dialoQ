const CaseConfigAdd = () => import(/* webpackChunkName: "CaseConfigAdd" */ './index')

export default {
    path: '/file-review/case-config/add',
    name: 'CaseConfigAdd',
    component: CaseConfigAdd,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        activeMenu: '/file-review/case-config',
        bodyClass: '',
        parent: 'Index',
        rank: 2,
        title: '新增案卷配置',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
