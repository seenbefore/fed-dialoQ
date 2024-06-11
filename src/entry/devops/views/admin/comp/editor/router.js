const component = () => import(/* webpackChunkName: "AdminCompEditor" */ './index')

export default {
    path: '/admin/comp/editor',
    name: 'AdminCompEditor',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '编辑器',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
