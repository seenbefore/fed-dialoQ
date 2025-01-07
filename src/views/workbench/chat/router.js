const AiChat = () => import(/* webpackChunkName: "AiChat" */ './index.vue')

export default {
    path: '/workbench/chat',
    name: 'AiAssistantChat',
    component: () => import(/* webpackChunkName: "AiAssistantChat" */ './index.vue'),
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: 'AI助手',
        keepAlive: true,
        requireAuth: true,
        noCache: false,
        affix: 0,
    },
}
