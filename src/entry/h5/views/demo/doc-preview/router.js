const component = () => import(/* webpackChunkName: "DemoDocPreview" */ './index')

export default {
    path: '/demo/doc-preview',
    name: 'DemoDocPreview',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '文书模板执行预览',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
