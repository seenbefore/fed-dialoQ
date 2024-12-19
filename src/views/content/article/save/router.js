const ArticleSave = () => import(/* webpackChunkName: "ArticleSave" */ './index.vue')

export default {
    path: '/content/article/save',
    name: 'ArticleSave',
    component: ArticleSave,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '编辑文章',
        keepAlive: false,
        requireAuth: true,
        activeMenu: '/content/article',
    },
}
