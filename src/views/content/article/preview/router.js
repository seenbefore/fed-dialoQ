const ArticlePreview = () => import(/* webpackChunkName: "ArticlePreview" */ './index.vue')

export default {
    path: '/content/article/preview',
    name: 'ArticlePreview',
    component: ArticlePreview,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '文章预览',
        keepAlive: false,
        requireAuth: true,
        activeMenu: '/content/article',
    },
}
