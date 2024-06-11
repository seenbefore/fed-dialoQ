const component = () => import(/* webpackChunkName: "PageScrollDemo" */ './index')

export default {
    path: '/demo/scroll-demo',
    name: 'PageScrollDemo',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '搜索滚动列表',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
