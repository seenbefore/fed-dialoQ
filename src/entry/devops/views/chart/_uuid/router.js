const component = () => import(/* webpackChunkName: "Chart_uuidPage1" */ './index')

export default {
    path: '/chart/:uuid',
    name: 'Chart_uuid',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '图表详情',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
