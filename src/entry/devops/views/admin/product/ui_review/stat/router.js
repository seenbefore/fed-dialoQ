const component = () => import(/* webpackChunkName: "AdminUi_reviewStatPage1" */ './index')

export default {
    path: '/admin/ui_review/stat',
    name: 'AdminUi_reviewStat',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: 'UI走查统计',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
