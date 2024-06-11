const component = () => import(/* webpackChunkName: "ReadmePage1" */ './index')

export default {
    path: '/readme',
    name: 'Readme',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
