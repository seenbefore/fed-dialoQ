const component = () => import(/* webpackChunkName: "ExampleEchartsPage1" */ './index')

export default {
    path: '/example/echarts',
    name: 'ExampleEcharts',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '图表组件示例',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
