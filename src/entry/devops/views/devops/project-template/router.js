const component = () => import(/* webpackChunkName: "DevopsProjectTemplate" */ './index')

export default {
    path: '/devops/project-template',
    name: 'DevopsProjectTemplate',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '项目模板',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    },
}
