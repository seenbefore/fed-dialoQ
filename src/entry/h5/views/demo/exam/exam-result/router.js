/* eslint-disable */
const ExamResult = () => import(/* webpackChunkName: "ExamResult" */ './index')

export default {
    path: '/exam/result',
    name: 'ExamResult',
    component: ExamResult,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        parent: 'Index',
        title: '考试结果',
    },
}
