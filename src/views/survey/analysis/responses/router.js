const QuestionnaireResponses = () => import(/* webpackChunkName: "QuestionnaireResponses" */ './index.vue')

export default {
    path: '/survey/analysis/responses',
    name: 'QuestionnaireResponses',
    component: QuestionnaireResponses,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '答卷管理',
        keepAlive: false,
        requireAuth: true,
        activeMenu: '/survey/analysis',
    },
}
