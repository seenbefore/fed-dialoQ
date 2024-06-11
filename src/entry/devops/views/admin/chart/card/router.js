const component = () => import(/* webpackChunkName: "AdminChartCardPage1" */ './index')

export default {
    path: '/admin/chart/card',
    name: 'AdminChartCard',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
