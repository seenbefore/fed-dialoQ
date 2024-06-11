const component = () => import(/* webpackChunkName: "DevopsPipelineCreate" */ './index')

export default {
    path: '/devops/pipeline/create',
    name: 'DevopsPipelineCreate',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '创建流水线',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
        activeMenu: '/devops/pipeline',
    },
}
