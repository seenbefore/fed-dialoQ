/* eslint-disable */
const QuestionPaperList = () => import(/* webpackChunkName: "QuestionPaperList" */ './index')
export default {
    path: '/question-bank/paper',
    name: 'QuestionPaperList',
    component: QuestionPaperList,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '考卷列表',
        keepAlive: false,
        requireAuth: false,
        aliveOnlyTo: [],
    },
}
