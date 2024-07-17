const component = () => import(/* webpackChunkName: "ExampleTwoPage1" */ './index')

export default {
    path: '/example/two',
    name: 'ExampleTwo',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '高阶组件示例',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
