const component = () => import(/* webpackChunkName: "AdminFeatTableFormPage1" */ './index')

export default {
    path: '/admin/feat/tableForm',
    name: 'AdminFeatTableForm',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '可编辑表格',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
