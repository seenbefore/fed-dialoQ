const component = () => import(/* webpackChunkName: "IndexPage1" */ './index')

export default {
    path: '/',
    name: 'Index',
    component,
    redirect: '/exam/list',
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
