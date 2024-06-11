const component = () => import(/* webpackChunkName: "AdminArticleListPage1" */ './index')

export default {
    path: '/admin/article/list',
    name: 'AdminArticleList',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '文章列表',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
