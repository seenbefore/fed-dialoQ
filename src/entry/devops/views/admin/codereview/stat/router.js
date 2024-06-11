const component = () => import(/* webpackChunkName: "AdminCodereviewStatPage1" */ './index')

export default {
    path: '/admin/codereview/stat',
    name: 'AdminCodereviewStat',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '走查统计',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
