const AiChat = () => import(/* webpackChunkName: "AiChat" */ './index.vue')

export default {
    path: '/ai-assistant/chat',
    name: 'AiChat',
    component: AiChat,
    props: ({ query, params }) => ({ ...query, ...params }),
    meta: {
        bodyClass: '',
        parent: 'Index',
        title: 'AI聊天室',
        keepAlive: true,
        requireAuth: true,
        activeMenu: '/ai-assistant',
    },
}
