const component = () => import(/* webpackChunkName: "LoginThird" */ './index')

export default {
    path: '/login-third',
    name: 'LoginThird',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '第三方登录',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    },
    props: route => ({
        redirect: route.query.redirect,
        action: route.query.action,
    }),
}
