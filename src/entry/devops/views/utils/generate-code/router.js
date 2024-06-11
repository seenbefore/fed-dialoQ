export default {
    path: '/utils/generate-code',
    name: 'GenerateCode',
    component: () => {
        /* XXX 用于移动端代码生成预览 */
        import('@/vant')
        return import(/* webpackChunkName: "FormGenerate" */ './index')
    },
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '代码生成',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
