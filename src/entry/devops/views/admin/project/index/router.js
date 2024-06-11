const component = () => import(/* webpackChunkName: "AdminProjectIndexPage1" */ './index')

export default {
    path: '/admin/project/index',
    name: 'AdminProjectIndex',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '项目列表',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
