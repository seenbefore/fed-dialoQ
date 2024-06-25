const component = () => import(/* webpackChunkName: "TaskPage1" */ './index')

export default {
    path: '/test',
    name: 'Test',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: 'test',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
