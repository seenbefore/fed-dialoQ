/* eslint-disable */
const ExamAuth = () => import(/* webpackChunkName: "ExamAuth" */ './index')

export default {
    path: '/exam/auth',
    name: 'ExamAuth',
    component: ExamAuth,
    meta: {
        title: '实名认证',
        keepAlive: false,
        requireAuth: true,
    },
}
