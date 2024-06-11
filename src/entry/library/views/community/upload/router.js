const component = () => import(/* webpackChunkName: "CommunityUploadPage1" */ './index')

export default {
    path: '/community/upload',
    name: 'CommunityUpload',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: 'CommunityUploadBody',
        parent: 'Index',
        title: '资产广场-发布',
        requireAuth: false,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
