export default {
    path: '/example/document',
    name: 'ExampleDocument',
    component: () => import('./index.vue'),
    meta: {
        title: '文书组件',
        parent: 'Index',
    },
}
