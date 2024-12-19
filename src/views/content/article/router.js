const ArticleManagement = () => import(/* webpackChunkName: "ArticleManagement" */ './index.vue')

export default {
    path: '/content/article',
    name: 'ArticleManagement',
    component: ArticleManagement,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '文章管理',
        keepAlive: true,
        requireAuth: true,
    },
}
