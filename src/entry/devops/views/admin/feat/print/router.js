const component = () => import(/* webpackChunkName: "AdminFeatPrintPage1" */ './index')

export default {
    path: '/admin/feat/print',
    name: 'AdminFeatPrint',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '打印',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
