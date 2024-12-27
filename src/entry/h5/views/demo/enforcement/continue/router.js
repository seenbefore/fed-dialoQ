const EnforcementContinue = () => import(/* webpackChunkName: "EnforcementContinue" */ './index.vue')

export default {
    path: '/enforcement/continue',
    name: 'EnforcementContinue',
    component: EnforcementContinue,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        title: '继续处置',
        keepAlive: false,
        requireAuth: true,
    },
}
