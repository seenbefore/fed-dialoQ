const PrePublicity = () => import(/* webpackChunkName: "PrePublicity" */ './index.vue')

export default {
    path: '/law-supervision/publicity/pre-publicity',
    name: 'PrePublicity',
    component: PrePublicity,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '事前信息公示',
        keepAlive: true,
        requireAuth: true,
    },
}
