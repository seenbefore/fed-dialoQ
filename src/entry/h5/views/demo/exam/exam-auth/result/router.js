/* eslint-disable */
const ExamAuthResult = () => import(/* webpackChunkName: "ExamAuthResult" */ './index')

export default {
    path: '/exam/auth/result',
    name: 'ExamAuthResult',
    component: ExamAuthResult,
    meta: {
        title: '认证结果',
        keepAlive: false,
        requireAuth: true,
    },
}
