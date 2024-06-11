const component = () => import(/* webpackChunkName: "TaskPage1" */ './index')

export default {
    path: '/task',
    name: 'Task',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '任务清单',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
