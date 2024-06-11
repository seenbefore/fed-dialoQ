const component = () => import(/* webpackChunkName: "Register" */ './index')

export default {
    path: '/register',
    name: 'Register',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '注册',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    },
}
