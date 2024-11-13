const ExamDetail = () => import(/* webpackChunkName: "ExamDetail" */ './index.vue')

export default {
    path: '/exam/detail/:id',
    name: 'ExamDetail',
    component: ExamDetail,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '答题',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
