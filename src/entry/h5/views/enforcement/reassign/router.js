const EnforcementReassign = () => import(/* webpackChunkName: "EnforcementReassign" */ './index.vue')

export default {
    path: '/enforcement/reassign',
    name: 'EnforcementReassign',
    component: EnforcementReassign,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        title: '重新选派部门',
        keepAlive: false,
        requireAuth: true,
    },
}
