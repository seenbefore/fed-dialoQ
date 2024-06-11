const component = () => import(/* webpackChunkName: "Index" */ './index')
export default {
    path: '/',
    name: 'Index',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '标题',
        requireAuth: true,
        keepAlive: true,
        aliveOnlyTo: [],
    },
}
