const component = () => import(/* webpackChunkName: "CommunityPage1" */ './index')

export default {
    path: '/',
    name: 'CommunityIndex',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '首页',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
        scrollToTop: false,
    },
}
