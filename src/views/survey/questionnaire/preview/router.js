const QuestionnairePreview = () => import(/* webpackChunkName: "QuestionnairePreview" */ './index.vue')

export default {
    path: '/survey/questionnaire/preview',
    name: 'QuestionnairePreview',
    component: QuestionnairePreview,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '问卷预览',
        keepAlive: false,
        requireAuth: true,
    },
}
