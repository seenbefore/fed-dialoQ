const CaseConfigSave = () => import(/* webpackChunkName: "CaseConfigSave" */ './index')

export default {
    path: '/file-review/case-config/save',
    name: 'CaseConfigSave',
    component: CaseConfigSave,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        activeMenu: '/file-review/case-config',
        bodyClass: '',
        parent: 'Index',
        rank: 2,
        title: '案卷配置',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
