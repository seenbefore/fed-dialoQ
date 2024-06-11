const component = () => import(/* webpackChunkName: "ProductDetail_uuidPage1" */ './index')

export default {
    path: '/product/detail',
    name: 'ProductDetail_uuid',
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
    props: ({ query: { title, version } }) => {
        return { title, version }
    },
}
