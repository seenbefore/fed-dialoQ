/* eslint-disable */
const WorkbenchAnalysis = () => import(/* webpackChunkName: "WorkbenchAnalysis" */ './index.vue')
export default {
    path: '/workbench/analysis',
    name: 'WorkbenchAnalysis',
    component: WorkbenchAnalysis,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '分析页',
        keepAlive: true,
        requireAuth: true,
        activeMenu: '/workbench',
    },
}
