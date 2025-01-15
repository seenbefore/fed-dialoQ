export default {
    path: '/example/table',
    name: 'ExampleTable',
    component: () => import('./index.vue'),
    meta: {
        title: '表格组件',
        parent: 'Index',
    },
}
