/* eslint-disable */
const Analysis = () => import(/* webpackChunkName: "Analysis" */ './index.vue')

export default {
    path: '/workbench/analysis',
    name: 'Analysis',
    component: Analysis,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '分析页',
        keepAlive: true,
        requireAuth: true,
        noCache: false,
        affix: 0,
    },
}
