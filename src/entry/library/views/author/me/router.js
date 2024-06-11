const component = () => import(/* webpackChunkName: "AuthorMePage1" */ './index')

export default {
    path: '/author/me',
    name: 'AuthorMe',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '我的',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
