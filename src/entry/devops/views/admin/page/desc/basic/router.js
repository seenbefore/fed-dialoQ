const component = () => import(/* webpackChunkName: "AdminPageDescBasicPage1" */ './index')

export default {
    path: '/admin/page/desc/basic',
    name: 'AdminPageDescBasic',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '基础详情页',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
