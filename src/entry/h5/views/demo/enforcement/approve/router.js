const EnforcementApprove = () => import(/* webpackChunkName: "EnforcementApprove" */ './index.vue')

export default {
    path: '/enforcement/approve',
    name: 'EnforcementApprove',
    component: EnforcementApprove,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        title: '执法审核',
        keepAlive: false,
        requireAuth: true,
    },
}
