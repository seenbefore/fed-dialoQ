const component = () => import(/* webpackChunkName: "DevopsArtifactPage1" */ './index')

export default {
    path: '/devops/artifact',
    name: 'DevopsArtifact',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '制品管理',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
