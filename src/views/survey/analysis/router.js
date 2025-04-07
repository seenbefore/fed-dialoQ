const QuestionnaireAnalysis = () => import(/* webpackChunkName: "QuestionnaireAnalysis" */ './index.vue')

export default {
    path: '/survey/analysis',
    name: 'QuestionnaireAnalysis',
    component: QuestionnaireAnalysis,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '数据分析',
        keepAlive: true,
        requireAuth: true,
    },
}
