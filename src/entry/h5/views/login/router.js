/* eslint-disable */
const Login = () => import(/* webpackChunkName: "Login" */ './index.vue')

export default {
    path: '/login',
    name: 'Login',
    component: Login,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '登录',
        keepAlive: false,
        requireAuth: false,
    },
}
