const component = () => import(/* webpackChunkName: "AdminProductReleasePage1" */ './index')

export default {
    path: '/admin/product/release',
    name: 'AdminProductRelease',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '发布单',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
        affix: 1,
    },
}
