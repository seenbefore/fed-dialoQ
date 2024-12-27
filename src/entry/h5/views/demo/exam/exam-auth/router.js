/* eslint-disable */
const ExamAuth = () => import(/* webpackChunkName: "ExamAuth" */ './index')

export default {
    path: '/exam/auth',
    name: 'ExamAuth',
    component: ExamAuth,
    meta: {
        parent: 'Index',
        title: '实名认证',
    },
}
