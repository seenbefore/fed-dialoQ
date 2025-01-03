import { mock } from 'mockjs'

export default [
    {
        name: '/exam/room/list',
        method: 'post',
        description: '考场列表',
        onMock(opt, query, body) {
            let { page = 1, pageNum = 1, pageSize, length } = body
            page = pageNum || 1
            pageSize = length || 10
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            area: '@city',
                            name: '宁波支队AB',
                            teachers: '@cname,@cname',
                            startTime: '2024-09-12 15:00:00',
                            endTime: '2024-09-12 17:00:00',
                            examName: '2024年第二次协助执法文员考试',
                        },
                    ],
                    recordsTotal: 198,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/exam/room/save',
        method: 'post',
        description: '保存考场',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '保存成功',
            })
        },
    },
    {
        name: '/exam/room/remove',
        method: 'get',
        description: '删除考场',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/exam/room/student/list',
        method: 'post',
        description: '考场学生列表',
        onMock(opt, query, body) {
            let { page = 1, pageNum = 1, pageSize, length } = body
            page = pageNum || 1
            pageSize = length || 10
            return mock({
                code: 200,
                data: {
                    [`data|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            name: '@cname',
                            'code|100000-999999': 100000,
                            department: '@city公安局@cword(2,4)大队',
                            'phone|13000000000-19999999999': 13000000000,
                        },
                    ],
                    recordsTotal: 56,
                },
                message: '请求成功',
            })
        },
    },
]
