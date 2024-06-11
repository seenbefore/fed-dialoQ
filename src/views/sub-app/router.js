/* eslint-disable */
const AdminSubApp = () =>
    import(/* webpackChunkName: "AdminSubApp" */ './index')
export default {
    path: '/sub-app/:origin',
    name: 'SubApp',
    component: AdminSubApp,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
    props: route => ({ origin: route.params.origin }),
}
