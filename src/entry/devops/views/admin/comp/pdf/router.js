const component = () => import(/* webpackChunkName: "AdminCompEditor" */ './index')

export default {
    path: '/admin/comp/pdf',
    name: 'AdminCompPDF',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '生成PDF(分页不截断)',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
