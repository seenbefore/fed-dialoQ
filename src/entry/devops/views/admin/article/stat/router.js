const component = () => import(/* webpackChunkName: "AdminArticleStatPage1" */ './index')

export default {
    path: '/admin/article/stat',
    name: 'AdminArticleStat',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '文章统计',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
