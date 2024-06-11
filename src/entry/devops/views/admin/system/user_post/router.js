const component = () => import(/* webpackChunkName: "AdminSystemPostPage1" */ './index')

export default {
    path: '/admin/system/user_post',
    name: 'AdminSystemPost',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '岗位管理',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
