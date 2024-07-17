const component = () => import(/* webpackChunkName: "ExampleOnePage1" */ './index')

export default {
    path: '/example/one',
    name: 'ExampleOne',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '基础组件示例',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
