const component = () => import(/* webpackChunkName: "AdminChartPage1" */ './index')

export default {
    path: '/admin/chart',
    name: 'AdminChart',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '图表',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
