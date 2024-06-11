const component = () => import(/* webpackChunkName: "DevopsUser" */ './index')

export default {
    path: '/devops/user',
    name: 'DevopsUser',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '用户管理',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    },
    props: ({ query, params }) => ({ ...query, ...params }),
}
