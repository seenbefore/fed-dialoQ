const component = () => import(/* webpackChunkName: "ForgetPasswordPage1" */ './index')

export default {
    path: '/forget-password',
    name: 'ForgetPassword',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '忘记密码',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
