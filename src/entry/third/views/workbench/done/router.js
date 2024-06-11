const component = () => import(/* webpackChunkName: "WorkbenchDonePage1" */ './index')

export default {
    path: '/workbench/done',
    name: 'WorkbenchDone',
    component,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '我的已办',
        requireAuth: true,
        keepAlive: false,
        noCache: false,
        activeMenu: '',
    },
}
