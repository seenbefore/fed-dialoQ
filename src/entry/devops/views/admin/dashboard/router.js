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
        // 固定在顶部 放在第一位 数值越大越靠前
        affix: 999,
    },
}
