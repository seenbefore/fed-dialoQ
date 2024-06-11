const component = () => import(/* webpackChunkName: "DemoBbPage1" */ './index')

export default {
    path: '/demo/bb',
    name: 'DemoBb',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: 'ss',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
