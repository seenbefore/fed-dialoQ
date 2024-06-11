const component = () => import(/* webpackChunkName: "AdminProductReleaseSavePage1" */ './index')

export default {
    path: '/admin/product/release/save',
    name: 'AdminProductReleaseSave',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '发布单保存',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '/admin/product/release',
    },
}
