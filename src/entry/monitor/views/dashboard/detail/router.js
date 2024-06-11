const component = () => import(/* webpackChunkName: "MonitorDetailPage1" */ './index')

export default {
    path: '/dashboard/detail/:messageId',
    name: 'MonitorDetail',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '错误详情',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '/devops/monitor',
    },
}
