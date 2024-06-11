const component = () => import(/* webpackChunkName: "HomePage1" */ './_layout')

export default {
    path: '/home',
    name: 'Home',
    component,
    redirect: '/home/index',
    meta: {
        bodyClass: 'HomeBody',
        parent: '',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
