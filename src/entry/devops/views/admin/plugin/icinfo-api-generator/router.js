const component = () => import(/* webpackChunkName: "DemoPluginIcinfoApiGeneratorPage1" */ './index')

export default {
    path: '/admin/plugin/icinfo-api-generator',
    name: 'DemoPluginIcinfoApiGenerator',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: 'API生成',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
