export default {
    path: '/test',
    name: 'TestPage',
    component: () => import(/* webpackChunkName: "TestPage" */ './index'),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: 'TestPage',
        requireAuth: true,
        keepAlive: true,
    },
}
