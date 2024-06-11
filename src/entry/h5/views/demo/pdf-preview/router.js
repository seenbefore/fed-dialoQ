const component = () => import(/* webpackChunkName: "DemoPdfPreview" */ './index')

export default {
    path: '/demo/pdf-preview',
    name: 'DemoPdfPreview',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: 'pdf预览',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
