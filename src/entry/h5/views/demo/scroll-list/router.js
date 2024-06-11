const component = () => import(/* webpackChunkName: "PageScrollList" */ './index')

export default {
    path: '/demo/scroll-list',
    name: 'PageScrollList',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '滚动列表',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
