import { mock } from 'mockjs'
const roles = ['系统管理员', '平台管理员', '数据统计人员', '信息录入人员', '普通人员']
export default [
    {
        name: '/mock/system/user/list',
        method: 'post',
        description: '用户列表',
        onMock(opt, query, body) {
            /* eslint-disable*/
            let { page = 1, pageSize, length } = body
            page = page || 1
            pageSize = pageSize || length || 10
            return mock({
                code: 0,
                data: {
                    [`list|${pageSize}`]: [
                        {
                            'id|+1': page * pageSize + 1,
                            name: '@name',
                            nickName: '@cname',
                            'status|1': [0, 1],
                            'role|1': roles,
                            'isAdmin|1': [0, 1],
                        },
                    ],
                    total: 198,
                    pager: {
                        page,
                        pageSize,
                        total: 198,
                    },
                },
                message: '请求提示',
            })
        },
    },
]
