const component = () => import(/* webpackChunkName: "ReadmePage1" */ './index')

export default {
    path: '/readme/:name',
    name: 'Readme',
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
