/* eslint-disable */
const SystemDepartment = () => import(/* webpackChunkName: "SystemDepartment" */ './index.vue')

export default {
    path: '/system/department',
    name: 'SystemDepartment',
    component: SystemDepartment,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '部门管理',
        keepAlive: true,
        requireAuth: true,
    },
}
