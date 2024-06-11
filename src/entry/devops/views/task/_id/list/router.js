const component = () => import(/* webpackChunkName: "Task_idListPage1" */ './index')

export default {
    path: '/task/:id/list',
    name: 'Task_idList',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Task',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
