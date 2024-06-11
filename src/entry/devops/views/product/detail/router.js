const component = () => import(/* webpackChunkName: "ProductDetail_uuidPage1" */ './_uuid/index.vue')

export default {
    path: '/product/detail/:uuid',
    name: 'ProductDetail_uuid2',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
    props: ({ query, params }) => ({ ...query, ...params }),
}
