const component = () => import(/* webpackChunkName: "DemoPluginVueTemplateAdminPage1" */ './index')

export default {
    path: '/admin/plugin/vue-template-admin',
    name: 'DemoPluginVueTemplateAdmin',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '后台模板',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
