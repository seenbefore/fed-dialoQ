const component = () => import(/* webpackChunkName: "AdminFeatBreadcrumbPage1" */ './index')

export default {
    path: '/admin/feat/breadcrumb',
    name: 'AdminFeatBreadcrumb',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '面包屑',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
