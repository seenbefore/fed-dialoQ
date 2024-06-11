const component = () => import(/* webpackChunkName: "AdminCompEditor" */ './index')

export default {
    path: '/comp/file-group-preview',
    name: 'AdminCompFileGroupPreivew',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '文件组预览',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
