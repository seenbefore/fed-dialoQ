const component = () => import(/* webpackChunkName: "AdminProductMyPage1" */ './index')

export default {
    path: '/admin/product/my',
    name: 'AdminProductMy',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '我的产品',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
