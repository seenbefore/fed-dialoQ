const AppError = () => import(/* webpackChunkName: "AppError" */ './index')
export default {
    path: '/error',
    name: 'App404',
    component: AppError,
    meta: {
        bodyClass: '',
        parent: '',
        title: '出错了',
        requireAuth: false,
        keepAlive: false,
    },
}
