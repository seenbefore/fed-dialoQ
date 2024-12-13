const ExamList = () => import(/* webpackChunkName: "ExamList" */ './index')

export default {
    path: '/exam/list',
    name: 'ExamList',
    component: ExamList,
    meta: {
        parent: 'Index',
        title: '考试列表',
    },
}
