const component = () => import(/* webpackChunkName: "ExampleTemplateOnePage1" */ './index')

export default {
    path: '/example/template-one',
    name: 'ExampleTemplateOne',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '大屏模板1',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
