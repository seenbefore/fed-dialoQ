const component = () => import(/* webpackChunkName: "AdminFeatScrollBoardPage1" */ './index')

export default {
    path: '/admin/feat/scroll-board',
    name: 'AdminFeatScrollBoard',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '轮播表',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
