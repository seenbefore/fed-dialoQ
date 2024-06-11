const component = () => import(/* webpackChunkName: "DemoWorkflowReadmePage1" */ './index')

export default {
    path: '/admin/workflow/readme',
    name: 'DemoWorkflowReadme',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '入职指南',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
