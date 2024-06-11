const component = () => import(/* webpackChunkName: "DevopsPipeline" */ './index')

export default {
    path: '/devops/pipeline',
    name: 'DevopsPipeline',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '流水线',
        requireAuth: true,
        keepAlive: true,
        aliveOnlyTo: [],
        noCache: false,
        // 固定在顶部 不能删除
        affix: 1,
    },
}
