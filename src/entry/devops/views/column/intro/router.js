const component = () => import(/* webpackChunkName: "ColumnIntroPage1" */ './index')

export default {
    path: '/column/intro',
    name: 'ColumnIntro',
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
