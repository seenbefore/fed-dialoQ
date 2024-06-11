const component = () => import(/* webpackChunkName: "TaskPage1" */ './index')

export default {
    path: '/utils/zlb-qr-code',
    name: 'UtilsZlbQrCode',
    component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '浙里办调试二维码',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    },
}
