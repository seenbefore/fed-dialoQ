const component = () => import(/* webpackChunkName: "PageScrollList" */ './index')

export default {
    path: '/demo/scroll-default',
    name: 'PageScrollDefault',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '基础列表',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
