const component = () => import(/* webpackChunkName: "DemoPageFormBasicPage1" */ './index')

export default {
    path: '/admin/page/form/basic',
    name: 'DemoPageFormBasic',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '基础表单',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
