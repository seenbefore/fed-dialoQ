const QuestionnaireManagement = () => import(/* webpackChunkName: "QuestionnaireManagement" */ './index.vue')

export default {
    path: '/survey/questionnaire',
    name: 'QuestionnaireManagement',
    component: QuestionnaireManagement,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '问卷管理',
        keepAlive: true,
        requireAuth: true,
    },
}
