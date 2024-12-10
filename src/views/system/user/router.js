/* eslint-disable */
const UserManage = () => import(/* webpackChunkName: "UserManage" */ './index')
export default {
    path: '/system/user',
    name: 'UserManage',
    component: UserManage,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '人员管理',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
