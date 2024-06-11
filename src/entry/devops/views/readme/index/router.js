const component = () => import(/* webpackChunkName: "ReadmeIndexPage1" */ './index')

export default {
    path: '/readme/index',
    name: 'ReadmeIndex',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
