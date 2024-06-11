const component = () => import(/* webpackChunkName: "DemoOnlineViewPage1" */ './index')

export default {
    path: '/demo/online-view',
    name: 'DemoOnlineView',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '在线预览pdf',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
