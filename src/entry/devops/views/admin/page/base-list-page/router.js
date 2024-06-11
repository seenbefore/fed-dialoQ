const component = () => import(/* webpackChunkName: "AdminPageBaseListPagePage1" */ './index')

export default {
    path: '/admin/page/base-list-page',
    name: 'AdminPageBaseListPage',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '基础列表页',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
