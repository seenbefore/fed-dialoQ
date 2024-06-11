const component = () => import(/* webpackChunkName: "CommunityPage1" */ './index')

export default {
    path: '/community',
    name: 'Community',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '资产广场',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
        scrollToTop: false,
    },
}
