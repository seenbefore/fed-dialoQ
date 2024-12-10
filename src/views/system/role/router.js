/* eslint-disable */
const RoleManage = () => import(/* webpackChunkName: "RoleManage" */ './index')
export default {
    path: '/system/role',
    name: 'RoleManage',
    component: RoleManage,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '角色管理',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
