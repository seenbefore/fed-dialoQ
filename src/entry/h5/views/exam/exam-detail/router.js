const ExamDetail = () => import(/* webpackChunkName: "ExamDetail" */ './index.vue')

export default {
    path: '/exam/detail/:id',
    name: 'ExamDetail',
    component: ExamDetail,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '答题',
        noCache: true,
    },
}
