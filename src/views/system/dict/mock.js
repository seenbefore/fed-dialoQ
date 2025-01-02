import { mock } from 'mockjs'

export default [
    {
        name: '/dict/type/list',
        method: 'get',
        description: '字典类型列表',
        onMock(opt, query, body) {
            return {
                code: 200,
                msg: 'ok',
                success: true,
                timestamp: Date.now(),
                data: [
                    {
                        id: 1,
                        createUserString: '系统管理员',
                        createTime: '2024-12-30 16:20:07',
                        updateUserString: null,
                        updateTime: null,
                        name: '公告类型',
                        code: 'notice_type',
                        description: null,
                        isSystem: true,
                    },
                    {
                        id: 2,
                        createUserString: '系统管理员',
                        createTime: '2024-12-30 16:20:07',
                        updateUserString: null,
                        updateTime: null,
                        name: '消息类型',
                        code: 'message_type',
                        description: null,
                        isSystem: true,
                    },
                    {
                        id: 3,
                        createUserString: '系统管理员',
                        createTime: '2024-12-30 16:20:07',
                        updateUserString: null,
                        updateTime: null,
                        name: '客户端类型',
                        code: 'client_type',
                        description: null,
                        isSystem: true,
                    },
                ],
            }
        },
    },
    {
        name: '/dict/list',
        method: 'post',
        description: '字典值列表',
        onMock(opt, query, body) {
            const { dictType } = body
            let data = []

            if (dictType === 'notice_type') {
                data = [
                    { id: 1, name: '通知', value: '1', sort: 1, status: '1', createTime: '@datetime' },
                    { id: 2, name: '活动', value: '2', sort: 2, status: '1', createTime: '@datetime' },
                ]
            } else if (dictType === 'message_type') {
                data = [
                    { id: 3, name: '系统消息', value: '1', sort: 1, status: '1', createTime: '@datetime' },
                    { id: 4, name: '业务消息', value: '2', sort: 2, status: '1', createTime: '@datetime' },
                ]
            } else if (dictType === 'client_type') {
                data = [
                    { id: 5, name: 'PC端', value: '1', sort: 1, status: '1', createTime: '@datetime' },
                    { id: 6, name: '移动端', value: '2', sort: 2, status: '1', createTime: '@datetime' },
                    { id: 7, name: '小程序', value: '3', sort: 3, status: '1', createTime: '@datetime' },
                ]
            }

            return mock({
                code: 200,
                data: {
                    data,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/dict/save',
        method: 'post',
        description: '保存字典',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: null,
                message: '保存成功',
            })
        },
    },
    {
        name: '/dict/delete',
        method: 'post',
        description: '删除字典',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: null,
                message: '删除成功',
            })
        },
    },
]
