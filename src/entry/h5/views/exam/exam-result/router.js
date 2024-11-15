/* eslint-disable */
const ExamResult = () => import(/* webpackChunkName: "ExamResult" */ './index')

export default {
    path: '/exam/result/:id',
    name: 'ExamResult',
    component: ExamResult,
    meta: {
        title: '考试结果',
        keepAlive: false,
        requireAuth: true,
    },
}
