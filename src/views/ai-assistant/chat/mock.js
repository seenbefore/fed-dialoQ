import { mock } from 'mockjs'

export default [
    {
        name: '/chat/sessions',
        method: 'get',
        description: '获取会话列表',
        onMock(opt, query) {
            return mock({
                code: 200,
                data: [
                    {
                        id: '1',
                        title: '新对话',
                        lastMessage: '您好！我是Claude，一个AI助手。很高兴为您服务。',
                        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        messageCount: 1,
                        isFavorite: false,
                        isTop: false,
                    },
                    {
                        id: '2',
                        title: '关于人工智能',
                        lastMessage: '人工智能正在改变我们的生活方式',
                        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        messageCount: 12,
                        isFavorite: true,
                        isTop: true,
                    },
                    {
                        id: '3',
                        title: '日常交流',
                        lastMessage: '今天天气真不错',
                        updateTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        messageCount: 8,
                        isFavorite: false,
                        isTop: false,
                    },
                ],
                message: '获取成功',
            })
        },
    },
    {
        name: '/chat/messages',
        method: 'get',
        description: '获取会话消息列表',
        onMock(opt, query, body) {
            const { sessionId } = query
            return mock({
                code: 200,
                data: [
                    {
                        id: '1',
                        sessionId,
                        sender: 'ai',
                        content: '您好！我是Claude，一个AI助手。很高兴为您服务。',
                        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        status: 'completed',
                    },
                    {
                        id: '2',
                        sessionId,
                        sender: 'user',
                        content: '今天天气真好啊',
                        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        status: 'completed',
                    },
                    {
                        id: '3',
                        sessionId,
                        sender: 'ai',
                        content: '是的，阳光明媚，非常适合出去散步。',
                        createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
                        status: 'completed',
                    },
                ],
                message: '获取成功',
            })
        },
    },
    {
        name: '/chat/sessions/delete',
        method: 'post',
        description: '删除会话',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
]
