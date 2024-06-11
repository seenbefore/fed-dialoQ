const component = () => import(/* webpackChunkName: "AdminSystemDictPage1" */ './index')

export default {
    path: '/admin/system/dict',
    name: 'AdminSystemDict',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '字典管理',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
