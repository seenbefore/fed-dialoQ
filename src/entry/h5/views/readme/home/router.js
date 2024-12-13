const component = () => import(/* webpackChunkName: "IndexHomePage1" */ './index')

export default {
    path: '/readme/home',
    name: 'ReadmeHome',
    component,
    meta: {
        bodyClass: '',
        parent: 'Readme',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
