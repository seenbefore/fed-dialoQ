const component = () => import(/* webpackChunkName: "DevopsPipelineLogId" */ './index')

export default {
    path: '/devops/pipeline-log/:id',
    name: 'DevopsPipelineLogId',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '应用详情',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
        activeMenu: '/devops/pipeline',
    },
    props: route => ({ id: route.params.id }),
}
