/* eslint-disable */
const CaseNumberConfig = () => import(/* webpackChunkName: "CaseNumberConfig" */ './index.vue')
export default {
    path: '/file-review/case-number-config',
    name: 'CaseNumberConfig',
    component: CaseNumberConfig,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '卷宗号配置',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
