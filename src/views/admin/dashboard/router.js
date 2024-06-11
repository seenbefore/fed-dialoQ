const component = () => import(/* webpackChunkName: "AdminDashboardPage1" */ './index')

export default {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '工作台',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
        affix: true,
    },
}
