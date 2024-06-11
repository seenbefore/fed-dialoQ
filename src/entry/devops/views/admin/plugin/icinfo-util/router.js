const component = () => import(/* webpackChunkName: "DemoPluginIcinfoUtilPage1" */ './index')

export default {
    path: '/admin/plugin/icinfo-util',
    name: 'DemoPluginIcinfoUtil',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '工具类',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
