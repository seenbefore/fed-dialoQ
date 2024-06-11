const component = () => import(/* webpackChunkName: "AdminWorkflowVuePage1" */ './index')

export default {
    path: '/admin/workflow/vue',
    name: 'AdminWorkflowVue',
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
