import { mock } from 'mockjs'
export default [
    {
        name: '/company/query',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            return mock({
                code: 200,
                message: '获取成功',
                data: [
                    {
                        id: '1',
                        name: '浙江汇信科技',
                    },
                    {
                        id: '2',
                        name: '杭州科技1',
                    },
                ],
            })
        },
    },
]
