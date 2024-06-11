const component = () => import(/* webpackChunkName: "DemoAaPage1" */ './index')

export default {
    path: '/demo/aa',
    name: 'DemoAa',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '是',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
