const component = () => import(/* webpackChunkName: "DevopsAgent" */ './index')

export default {
    path: '/devops/agent',
    name: 'DevopsAgent',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '构建节点',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    },
}
