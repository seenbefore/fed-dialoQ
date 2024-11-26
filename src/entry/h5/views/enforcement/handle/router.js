const EnforcementHandle = () => import(/* webpackChunkName: "EnforcementHandle" */ './index.vue')

export default {
    path: '/enforcement/handle',
    name: 'EnforcementHandle',
    component: EnforcementHandle,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        title: '现场处置',
        keepAlive: false,
        requireAuth: true,
    },
}
