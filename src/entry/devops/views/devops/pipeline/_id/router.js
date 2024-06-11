const component = () => import(/* webpackChunkName: "DevopsPipelineId" */ './index')

export default {
    path: '/devops/pipeline/:id',
    name: 'DevopsPipelineId',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '应用',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
        activeMenu: '/devops/pipeline',
    },
    props: route => ({ id: route.params.id }),
}
