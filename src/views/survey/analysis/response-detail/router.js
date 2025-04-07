const ResponseDetail = () => import(/* webpackChunkName: "ResponseDetail" */ './index.vue')

export default {
    path: '/survey/analysis/response-detail',
    name: 'ResponseDetail',
    component: ResponseDetail,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '答卷详情',
        keepAlive: false,
        requireAuth: true,
        activeMenu: '/survey/analysis',
    },
}
