/* eslint-disable */
const SystemFileManage = () => import(/* webpackChunkName: "SystemFileManage" */ './index.vue')
export default {
    path: '/system/file-manage',
    name: 'SystemFileManage',
    component: SystemFileManage,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '文件管理',
        keepAlive: true,
        requireAuth: true,
        activeMenu: '',
        noCache: false,
        affix: 0,
    },
}
