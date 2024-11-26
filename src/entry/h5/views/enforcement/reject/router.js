const EnforcementReject = () => import(/* webpackChunkName: "EnforcementReject" */ './index.vue')

export default {
    path: '/enforcement/reject',
    name: 'EnforcementReject',
    component: EnforcementReject,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        title: '执法退回',
        keepAlive: false,
        requireAuth: true,
    },
}
