const component = () => import(/* webpackChunkName: "HomeIndexPage1" */ './index')

export default {
    path: '/home/index',
    name: 'HomeIndex',
    component,
    meta: {
        bodyClass: '',
        parent: 'Home',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
