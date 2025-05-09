const component = () => import(/* webpackChunkName: "IndexPage1" */ './index')

export default {
    path: '/',
    name: 'Index',
    component,
    redirect: '/readme/home',
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
