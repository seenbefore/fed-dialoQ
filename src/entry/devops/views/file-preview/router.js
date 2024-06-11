const component = () => import('./index')

export default {
    path: '/file-preview',
    name: 'PageFilePreview',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '文件预览',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
