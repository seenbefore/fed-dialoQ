const component = () => import(/* webpackChunkName: "DevopsPipelineStatPage1" */ './index')

export default {
    path: '/devops/pipeline/stat',
    name: 'DevopsPipelineStat',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
