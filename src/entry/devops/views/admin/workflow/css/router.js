const component = () => import(/* webpackChunkName: "AdminWorkflowCssPage1" */ './index')

export default {
    path: '/admin/workflow/css',
    name: 'AdminWorkflowCss',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
