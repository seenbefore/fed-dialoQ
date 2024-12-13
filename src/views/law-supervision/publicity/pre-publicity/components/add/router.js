const PrePublicityAdd = () => import(/* webpackChunkName: "PrePublicityAdd" */ './index.vue')

export default {
    path: '/law-supervision/publicity/pre-publicity/add',
    name: 'PrePublicityAdd',
    component: PrePublicityAdd,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: '新增公示信息',
        keepAlive: false,
        requireAuth: true,
    },
}
