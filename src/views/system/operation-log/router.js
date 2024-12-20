const OperationLog = () => import(/* webpackChunkName: "OperationLog" */ './index.vue')

export default {
    path: '/system/operation-log',
    name: 'OperationLog',
    component: OperationLog,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '操作日志',
        keepAlive: true,
        requireAuth: true,
    },
}
