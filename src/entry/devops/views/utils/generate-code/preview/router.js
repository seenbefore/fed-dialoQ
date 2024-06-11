export default {
    path: '/utils/generate-code/preview',
    name: 'GenerateCodePreview',
    component: () => {
        /* XXX 用于移动端代码生成预览 */
        import('@/vant')
        return import(/* webpackChunkName: "GenerateCodePreview" */ './index')
    },
    meta: {
        bodyClass: '',
        parent: '',
        title: '代码生成预览',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
