/* eslint-disable */
const component = () => import(/* webpackChunkName: "Index2" */ './index')

export default {
    path: '/index2',
    name: 'Index2',
    component: component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '首页',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
