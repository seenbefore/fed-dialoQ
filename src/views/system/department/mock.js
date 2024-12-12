import { mock } from 'mockjs'

export default [
    {
        name: '/system/department/tree',
        method: 'get',
        description: '部门列表',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: [
                    {
                        id: '1',
                        name: 'Xxx科技有限公司',
                        status: 1,
                        description: '系统初始部门',
                        createTime: '2024-03-20 23:54:36',
                        createUserString: 'admin',
                        updateTime: '2024-03-20 23:54:36',
                        updateUserString: 'admin',
                        disabled: true,
                        parentId: '0',
                        sort: 1,
                        isSystem: true,
                        children: [
                            {
                                id: '2',
                                name: '天津总部',
                                status: 1,
                                description: '',
                                createTime: '2024-03-20 23:54:36',
                                createUserString: 'admin',
                                updateTime: '2024-03-20 23:54:36',
                                updateUserString: 'admin',
                                disabled: false,
                                parentId: '1',
                                sort: 1,
                                isSystem: false,
                                children: [
                                    {
                                        id: '3',
                                        name: '研发部',
                                        status: 1,
                                        description: '',
                                        createTime: '2024-03-20 23:54:36',
                                        createUserString: 'admin',
                                        updateTime: '2024-03-20 23:54:36',
                                        updateUserString: 'admin',
                                        disabled: false,
                                        parentId: '2',
                                        sort: 1,
                                        isSystem: false,
                                        children: [
                                            {
                                                id: '4',
                                                name: '研发一组',
                                                status: 1,
                                                description: '',
                                                createTime: '2024-03-20 23:54:36',
                                                createUserString: 'admin',
                                                updateTime: '2024-03-20 23:54:36',
                                                updateUserString: 'admin',
                                                disabled: false,
                                                parentId: '3',
                                                sort: 1,
                                                isSystem: false,
                                            },
                                            {
                                                id: '5',
                                                name: '研发二组',
                                                status: 2,
                                                description: '',
                                                createTime: '2024-03-20 23:54:36',
                                                createUserString: 'admin',
                                                updateTime: '2024-03-20 23:54:36',
                                                updateUserString: 'admin',
                                                disabled: false,
                                                parentId: '3',
                                                sort: 2,
                                                isSystem: false,
                                            },
                                        ],
                                    },
                                    {
                                        id: '6',
                                        name: 'UI部',
                                        status: 1,
                                        description: '',
                                        createTime: '2024-03-20 23:54:36',
                                        createUserString: 'admin',
                                        updateTime: '2024-03-20 23:54:36',
                                        updateUserString: 'admin',
                                        disabled: false,
                                        parentId: '2',
                                        sort: 2,
                                        isSystem: false,
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
        name: '/system/department/detail',
        method: 'get',
        description: '部门详情',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: {
                    id: query.id,
                    name: '研发部',
                    status: 1,
                    description: '',
                    createTime: '2024-03-20 23:54:36',
                    createUserString: 'admin',
                    updateTime: '2024-03-20 23:54:36',
                    updateUserString: 'admin',
                    disabled: false,
                    parentId: '2',
                    sort: 1,
                    isSystem: false,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/system/department/remove',
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
        name: '/system/department/save',
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
