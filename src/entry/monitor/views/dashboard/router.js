const component = () => import(/* webpackChunkName: "MonitorPage1" */ './index')

export default {
    path: '/dashboard',
    name: 'Monitor',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '监控平台',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
