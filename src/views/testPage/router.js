const component = () => import(/* webpackChunkName: "TestPage" */ './index')

export default {
    path: '/test',
    name: 'TestPage',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: 'TestPage',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
