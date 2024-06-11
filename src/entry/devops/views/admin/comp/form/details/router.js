const component = () => import(/* webpackChunkName: "DemoCompFormReadmePage1" */ './index')

export default {
    path: '/admin/comp/form/details',
    name: 'DemoCompFormDetails',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '详情表单说明',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
