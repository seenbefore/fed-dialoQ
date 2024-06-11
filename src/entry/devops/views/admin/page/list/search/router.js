const component = () => import(/* webpackChunkName: "AdminPageListSearchPage1" */ './index')

export default {
    path: '/admin/page/list/search',
    name: 'AdminPageListSearch',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '搜索列表',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
