const component = () => import(/* webpackChunkName: "WorkbenchDoneDetailPage1" */ './index')

export default {
    path: '/workbench/done/detail',
    name: 'WorkbenchDoneDetail',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '查看详情',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
