const component = () => import(/* webpackChunkName: "DemoBPage1" */ './index')

export default {
    path: '/demo/b',
    name: 'DemoB',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
