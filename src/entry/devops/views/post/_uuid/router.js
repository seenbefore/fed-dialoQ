const component = () => import(/* webpackChunkName: "Post_uuidPage1" */ './index')

export default {
    path: '/post/:uuid',
    name: 'Post_uuid',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
    props: route => ({ uuid: route.params.uuid }),
}
