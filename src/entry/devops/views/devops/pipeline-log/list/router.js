const component = () => import(/* webpackChunkName: "DevopsPipelineLogListPage1" */ './index')

export default {
    path: '/devops/pipeline-log/list',
    name: 'DevopsPipelineLogList',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
