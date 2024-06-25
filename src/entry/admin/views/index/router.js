/* eslint-disable */
const AdminIndex = () =>
    import(/* webpackChunkName: "AdminIndex" */ './_layout')
export default {
    path: '/',
    name: 'Index',
    component: AdminIndex,
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
        keepAlive: false,
        requireAuth: true,
    },
}
