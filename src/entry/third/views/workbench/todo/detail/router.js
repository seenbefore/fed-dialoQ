const component = () => import(/* webpackChunkName: "WorkbenchTodoDetailPage1" */ './index')

export default {
    path: '/workbench/todo/detail',
    name: 'WorkbenchTodoDetail',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '我的待办-审批',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '/workbench/todo',
    },
}
