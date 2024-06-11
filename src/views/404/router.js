const App404 = () => import(/* webpackChunkName: "App404" */ './index')
export default {
    path: '/404',
    name: 'App404',
    component: App404,
    meta: {
        bodyClass: '',
        parent: '',
        title: '404',
        requireAuth: false,
        keepAlive: false,
    },
}
