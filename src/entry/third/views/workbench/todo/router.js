const component = () => import(/* webpackChunkName: "WorkbenchTodoPage1" */ './index')

export default {
    path: '/workbench/todo',
    name: 'WorkbenchTodo',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '我的待办',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
