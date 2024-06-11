const component = () => import(/* webpackChunkName: "LoginFree" */ './index')

export default {
    path: '/login-free',
    name: 'LoginFree',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '第三方自动登录',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    },
}
