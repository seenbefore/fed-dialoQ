const PrePublicityPreview = () => import(/* webpackChunkName: "PrePublicityPreview" */ './index.vue')

export default {
    path: '/law-supervision/publicity/pre-publicity/preview',
    name: 'PrePublicityPreview',
    component: PrePublicityPreview,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '预览公示信息',
        keepAlive: false,
        requireAuth: true,
    },
}
