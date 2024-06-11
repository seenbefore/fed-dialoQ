const component = () => import(/* webpackChunkName: "AdminArticleComponentPage1" */ './index')

export default {
    path: '/admin/article/component',
    name: 'AdminArticleComponent',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '组件集合',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
