/* eslint-disable */
const MenuManage = () => import(/* webpackChunkName: "MenuManage" */ './index')
export default {
    path: '/system/menu',
    name: 'MenuManage',
    component: MenuManage,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '菜单管理',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
