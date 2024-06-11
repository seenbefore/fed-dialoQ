const component = () => import(/* webpackChunkName: "AdminProductTestingPage1" */ './index')

export default {
    path: '/admin/product/testing',
    name: 'AdminProductTesting',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '提测单',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
