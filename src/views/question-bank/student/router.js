const StudentList = () => import(/* webpackChunkName: "StudentList" */ './index.vue')

export default {
    path: '/question-bank/student',
    name: 'StudentList',
    component: StudentList,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '考生列表',
        keepAlive: true,
        requireAuth: true,
    },
}
