const component = () => import(/* webpackChunkName: "AdminFeatInlineInputPage1" */ './index')

export default {
    path: '/admin/feat/inlineInput',
    name: 'AdminFeatInlineInput',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '行内输入框',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
