/* eslint-disable */
const QuestionBankList = () => import(/* webpackChunkName: "QuestionBankList" */ './index')
export default {
    path: '/question-bank/list',
    name: 'QuestionBankList',
    component: QuestionBankList,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '题库列表',
        keepAlive: false,
        requireAuth: false,
        aliveOnlyTo: [],
    },
}
