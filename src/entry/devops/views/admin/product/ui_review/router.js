const component = () => import(/* webpackChunkName: "AdminUi_reviewPage1" */ './index')

export default {
    path: '/admin/ui_review',
    name: 'AdminUi_review',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: 'UI走查',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
