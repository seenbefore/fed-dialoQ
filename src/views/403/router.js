/* eslint-disable */
const Admin403 = () => import(/* webpackChunkName: "Admin_403" */ './index')
export default {
    path: '/403',
    name: 'Admin403',
    component: Admin403,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '403',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
