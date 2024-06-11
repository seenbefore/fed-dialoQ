const component = () => import(/* webpackChunkName: "AdminArticleDetailPage1" */ './index')

export default {
    path: '/admin/article/detail',
    name: 'AdminArticleDetail',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '文章详情',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
    props: route => ({ id: route.query.id }),
}
