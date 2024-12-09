const DictManage = () => import(/* webpackChunkName: "DictManage" */ './index.vue')

export default {
    path: '/system/dict',
    name: 'DictManage',
    component: DictManage,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '数据字典',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
