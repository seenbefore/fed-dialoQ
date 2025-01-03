/* eslint-disable */
const QuestionPaperPreview = () => import(/* webpackChunkName: "QuestionPaperPreview" */ './index.vue')
export default {
    path: '/question-bank/paper/preview',
    name: 'QuestionPaperPreview',
    component: QuestionPaperPreview,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '试卷预览',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
