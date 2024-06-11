const component = () => import(/* webpackChunkName: "LoginFree" */ './index')

export default {
    path: '/login-free',
    name: 'LoginFree',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '访客登录',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    },
}
