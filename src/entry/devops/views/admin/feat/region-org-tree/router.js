const component = () => import(/* webpackChunkName: "AdminFeatRegionOrgTreePage1" */ './index')

export default {
    path: '/admin/feat/regionOrgTree',
    name: 'AdminFeatRegionOrgTree',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '区域机构树',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
