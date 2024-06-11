const component = () => import(/* webpackChunkName: "DemoFillInFormPage1" */ './index')

export default {
    path: '/demo/fill-in-form',
    name: 'DemoFillInForm',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '填写表单',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
