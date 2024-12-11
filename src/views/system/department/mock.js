import { mock } from 'mockjs'

export default [
    {
        name: '/department/list',
        method: 'post',
        description: '部门列表',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: [
                    {
                        id: '1',
                        name: 'Xxx科技有限公司',
                        status: '1',
                        description: '系统初始部门',
                        createTime: '2024-09-20 23:54:36',
                        children: [
                            {
                                id: '2',
                                name: '天津总部',
                                status: '1',
                                description: '',
                                createTime: '2024-09-20 23:54:36',
                                children: [
                                    {
                                        id: '3',
                                        name: '研发部',
                                        status: '1',
                                        description: '',
                                        createTime: '2024-09-20 23:54:36',
                                        children: [
                                            {
                                                id: '4',
                                                name: '研发一组',
                                                status: '1',
                                                description: '',
                                                createTime: '2024-09-20 23:54:36',
                                            },
                                            {
                                                id: '5',
                                                name: '研发二组',
                                                status: '0',
                                                description: '',
                                                createTime: '2024-09-20 23:54:36',
                                            },
                                        ],
                                    },
                                    {
                                        id: '6',
                                        name: 'UI部',
                                        status: '1',
                                        description: '',
                                        createTime: '2024-09-20 23:54:36',
                                    },
                                    {
                                        id: '7',
                                        name: '测试部',
                                        status: '1',
                                        description: '',
                                        createTime: '2024-09-20 23:54:36',
                                    },
                                    {
                                        id: '8',
                                        name: '运维部',
                                        status: '1',
                                        description: '',
                                        createTime: '2024-09-20 23:54:36',
                                    },
                                ],
                            },
                        ],
                    },
                ],
                message: '请求成功',
            })
        },
    },
    {
        name: '/department/detail',
        method: 'get',
        description: '部门详情',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: {
                    id: query.id,
                    name: '研发部',
                    status: '1',
                    description: '',
                    createTime: '2024-09-20 23:54:36',
                },
            })
        },
    },
    {
        name: '/department/remove',
        method: 'get',
        description: '删除部门',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/department/save',
        method: 'post',
        description: '保存部门',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '保存成功',
            })
        },
    },
]
