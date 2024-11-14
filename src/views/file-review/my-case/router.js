const MyCase = () => import(/* webpackChunkName: "MyCase" */ './index')

export default {
    path: '/file-review/my-case',
    name: 'MyCase',
    component: MyCase,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '我的卷宗',
        keepAlive: false,
        requireAuth: true,
        aliveOnlyTo: [],
    },
}
