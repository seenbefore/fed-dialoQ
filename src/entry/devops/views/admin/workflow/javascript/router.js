const component = () => import(/* webpackChunkName: "AdminWorkflowJavascriptPage1" */ './index')

export default {
    path: '/admin/workflow/javascript',
    name: 'AdminWorkflowJavascript',
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
