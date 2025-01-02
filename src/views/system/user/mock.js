import { mock } from 'mockjs'
const roles = ['系统管理员', '平台管理员', '数据统计人员', '信息录入人员', '普通人员']
export default [
    {
        name: '/user/list',
        method: 'post',
        description: '用户列表',
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
                            nickName: '@cname',
                            'status|1': [0, 1],
                            'role|1': roles,
                            'isAdmin|1': [0, 1],
                        },
                    ],
                    recordsTotal: 198,
                },
                message: '请求成功',
            })
        },
    },
    {
        name: '/user/detail',
        method: 'get',
        description: '用户详情',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                data: {
                    id: 1,
                    name: 'admin',
                    nickName: '管理员',
                    status: 1,
                    role: '系统管理员',
                    isAdmin: 1,
                },
            })
        },
    },
    {
        name: '/user/remove',
        method: 'get',
        description: '删除用户',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '删除成功',
            })
        },
    },
    {
        name: '/user/save',
        method: 'post',
        description: '保存用户',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '保存成功',
            })
        },
    },
    {
        name: '/company/query',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            const { search } = body
            let result = mock([
                {
                    id: '1',
                    name: '@ctitle(5, 10)',
                },
                {
                    id: '2',
                    name: '@ctitle(10, 20)',
                },
            ])
            result = result.map(item => {
                return {
                    ...item,
                    name: item.name + search,
                }
            })
            return {
                code: 200,
                message: '获取成功',
                data: result,
            }
        },
    },
]
