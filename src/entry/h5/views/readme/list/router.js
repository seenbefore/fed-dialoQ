const component = () => import(/* webpackChunkName: "ReadmeList" */ './index.vue')

export default {
    path: '/readme/list',
    name: 'ReadmeList',
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
