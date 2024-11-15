const ExamList = () => import(/* webpackChunkName: "ExamList" */ './index')

export default {
    path: '/exam/list',
    name: 'ExamList',
    component: ExamList,
    meta: {
        title: '考试列表',
        keepAlive: false,
        requireAuth: true,
    },
}
