const component = () => import(/* webpackChunkName: "AdminArticleEditPage1" */ './index')

export default {
    path: '/admin/article/edit',
    name: 'AdminArticleEdit',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '文章编辑',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '/admin/article/list',
    },
    props: ({ query: { id, isEdit, row } }) => {
        row = row ? JSON.parse(row) : null
        return { id, isEdit, row }
    },
}
