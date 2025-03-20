/* eslint-disable */
const ActivitySignup = () => import(/* webpackChunkName: "ActivitySignup" */ './index')
export default {
    path: '/activity/signup',
    name: 'ActivitySignup',
    component: ActivitySignup,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '活动报名',
        keepAlive: false,
    },
}
