const component = () => import(/* webpackChunkName: "Community_uuidPage1" */ './index2.vue')

export default {
    path: '/community/:id',
    name: 'Community_uuid',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '资产详情',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
