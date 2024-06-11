const component = () => import(/* webpackChunkName: "DevopsAppPage1" */ './index')

export default {
    path: '/devops/app',
    name: 'DevopsApp',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '业务分工',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
