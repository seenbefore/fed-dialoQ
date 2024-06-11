const component = () => import(/* webpackChunkName: "DevopsNginx" */ './index')

export default {
    path: '/devops/nginx',
    name: 'DevopsNginx',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: 'nginx管理',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    },
}
