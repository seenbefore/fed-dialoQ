const QuestionnaireSave = () => import(/* webpackChunkName: "QuestionnaireSave" */ './index.vue')

export default {
    path: '/survey/questionnaire/save',
    name: 'QuestionnaireSave',
    component: QuestionnaireSave,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '问卷编辑',
        keepAlive: false,
        requireAuth: true,
    },
}
