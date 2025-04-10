export default {
    path: '/component-preview',
    name: 'ComponentPreview',
    component: () => import('./index.vue'),
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '组件预览',
        keepAlive: true,
        requireAuth: false,
    },
}
