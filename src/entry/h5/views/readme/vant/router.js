const component = () => import(/* webpackChunkName: "ReadmeVant" */ './index.vue')

export default {
    path: '/readme/vant',
    name: 'ReadmeVant',
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
