const component = () => import(/* webpackChunkName: "DemoPluginsIcinfoRequestPage1" */ './index')

export default {
    path: '/admin/plugin/icinfo-request',
    name: 'DemoPluginsIcinfoRequest',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: 'API请求',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
