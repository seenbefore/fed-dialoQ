export default [
    {
        path: '/survey/questionnaire/fill',
        name: 'QuestionnaireFill',
        component: () => import('./index.vue'),
        meta: {
            title: '问卷填写',
            requiresAuth: false, // 不需要登录即可访问
        },
    },
]
