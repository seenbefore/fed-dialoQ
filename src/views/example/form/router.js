export default {
    path: '/example/form',
    name: 'ExampleForm',
    component: () => import('@/views/example/form/index.vue'),
    meta: {
        title: '表单组件',
        parent: 'Index',
    },
}
