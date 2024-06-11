const component = () => import(/* webpackChunkName: "AdminSystemUser_groupPage1" */ './index')

export default {
    path: '/admin/system/user_group',
    name: 'AdminSystemUser_group',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '用户组',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
