const component = () => import(/* webpackChunkName: "PageScrollTab" */ './index')

export default {
    path: '/demo/scroll-tab',
    name: 'PageScrollTab',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: 'tab切换列表',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
