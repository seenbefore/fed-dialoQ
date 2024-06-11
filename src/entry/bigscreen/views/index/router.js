const component = () => import(/* webpackChunkName: "Index" */ './index')

export default {
    path: '/',
    name: 'Index',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '衢州市执法监管驾驶舱',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
