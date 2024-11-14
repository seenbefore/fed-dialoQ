const CaseConfig = () => import(/* webpackChunkName: "CaseConfig" */ './index')

export default {
    path: '/file-review/case-config',
    name: 'CaseConfig',
    component: CaseConfig,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '案卷配置',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
