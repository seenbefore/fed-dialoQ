const component = () => import(/* webpackChunkName: "DemoSign" */ './index')

export default {
    path: '/demo/sign',
    name: 'DemoSign',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '签名',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
