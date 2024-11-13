const ExamList = () => import(/* webpackChunkName: "ExamList" */ './index.vue')

export default {
    path: '/exam/list',
    name: 'ExamList',
    component: ExamList,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '考试列表',
        keepAlive: true,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
