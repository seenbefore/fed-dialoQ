const component = () => import(/* webpackChunkName: "AdminProductListPage1" */ './index')

export default {
    path: '/admin/product/list',
    name: 'AdminProductList',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '产品列表',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
        // 固定在顶部 不能删除
        //affix: 2,
    },
    props: ({ query: { title, version } }) => {
        return { title, version }
    },
}
