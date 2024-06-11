const component = () => import(/* webpackChunkName: "AdminChartEditPage1" */ './index')

export default {
    path: '/admin/chart/edit',
    name: 'AdminChartEdit',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '图表编辑',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '/admin/chart',
    },
}
