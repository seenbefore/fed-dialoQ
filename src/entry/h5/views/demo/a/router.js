const component = () => import(/* webpackChunkName: "DemoAPage1" */ './index')

export default {
    path: '/demo/a',
    name: 'DemoA',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '',
        requireAuth: false,
        keepAlive: true,
        noCache: false,
        activeMenu: '',
    },
}
