const component = () => import(/* webpackChunkName: "PageScrollList" */ './index')

export default {
    path: '/demo/scroll-search',
    name: 'PageScrollSearch',
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
