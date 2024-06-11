const component = () => import(/* webpackChunkName: "AdminProductUi_reviewProduct_statPage1" */ './index')

export default {
    path: '/admin/product/ui_review/product_stat',
    name: 'AdminProductUi_reviewProduct_stat',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: 'UI走查-产品统计',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
