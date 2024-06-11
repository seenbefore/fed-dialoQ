const component = () => import(/* webpackChunkName: "IndexPage" */ './_layout')

export default {
    path: '/',
    name: 'Index',
    component,
    redirect: '/',
    meta: {
        bodyClass: '',
        parent: '',
        title: '',
    },
}
