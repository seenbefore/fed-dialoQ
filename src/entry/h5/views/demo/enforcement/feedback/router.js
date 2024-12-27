const EnforcementFeedback = () => import(/* webpackChunkName: "EnforcementFeedback" */ './index.vue')

export default {
    path: '/enforcement/feedback',
    name: 'EnforcementFeedback',
    component: EnforcementFeedback,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        title: '执法结果反馈',
        keepAlive: false,
        requireAuth: true,
    },
}
