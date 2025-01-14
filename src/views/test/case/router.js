const TestCase = () => import(/* webpackChunkName: "TestCase" */ './index.vue')

export default {
    path: '/test/case',
    name: 'TestCase',
    component: TestCase,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '测试用例',
        keepAlive: true,
        requireAuth: true,
        activeMenu: '/test',
        noCache: false,
        affix: 0,
    },
}
