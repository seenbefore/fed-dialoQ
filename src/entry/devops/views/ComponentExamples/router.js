const component = () => import(/* webpackChunkName: "ComponentExamplesPage1" */ './index')

export default {
    path: '/ComponentExamples',
    name: 'ComponentExamples',
    // 隐藏
    //component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '组件案例',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
