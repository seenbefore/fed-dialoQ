const component = () => import(/* webpackChunkName: "IndexHomePage1" */ './index')

export default {
    path: '/index/home',
    name: 'IndexHome',
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
