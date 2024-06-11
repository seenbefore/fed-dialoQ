const component = () => import(/* webpackChunkName: "ColumnArticle_idPage1" */ './index')

export default {
    path: '/column/article/:id',
    name: 'ColumnArticle_id',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
