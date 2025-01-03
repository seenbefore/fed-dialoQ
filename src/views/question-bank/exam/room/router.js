/* eslint-disable */
const ExamRoom = () => import(/* webpackChunkName: "ExamRoom" */ './index.vue')
export default {
    path: '/question-bank/exam/room',
    name: 'ExamRoom',
    component: ExamRoom,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '考场管理',
        keepAlive: true,
        requireAuth: true,
        activeMenu: '/exam',
        noCache: false,
        affix: 0,
    },
}
