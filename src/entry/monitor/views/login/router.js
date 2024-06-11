/* eslint-disable */
const Login = () => import(/* webpackChunkName: "AdminLogin" */ './index')
export default {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
        bodyClass: 'Login',
        parent: '',
        rank: 1,
        title: '',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
    props: route => ({
        redirect: route.query.redirect,
        action: route.query.action,
    }),
}
