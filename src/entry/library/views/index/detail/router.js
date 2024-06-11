const component = () => import(/* webpackChunkName: "ComponentLibraryDetailPage" */ './index')

export default {
    path: '/component-library/detail',
    name: 'ComponentLibraryDetail',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
    },
}
