/* eslint-disable */
const ExamQuestion = () => import(/* webpackChunkName: "ExamQuestion" */ './index')

export default {
    path: '/exam/question',
    name: 'ExamQuestion',
    component: ExamQuestion,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '考试题目',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
