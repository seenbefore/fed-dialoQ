const component = () => import(/* webpackChunkName: "WorkbenchTodoHomePage1" */ './index')

export default {
    path: '/workbench/todo/home',
    name: 'WorkbenchTodoHome',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '我的待办-企业',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
