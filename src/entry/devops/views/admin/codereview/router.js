const component = () => import(/* webpackChunkName: "AdminCodereviewPage1" */ './index')

export default {
    path: '/admin/codereview',
    name: 'AdminCodereview',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '代码走查',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
