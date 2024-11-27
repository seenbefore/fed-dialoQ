/* eslint-disable */
const ExamResult = () => import(/* webpackChunkName: "ExamResult" */ './index')

export default {
    path: '/exam/result/:id',
    name: 'ExamResult',
    component: ExamResult,
    meta: {
        parent: 'Index',
        title: '考试结果',
        noCache: true,
    },
}
