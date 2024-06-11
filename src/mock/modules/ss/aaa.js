import { mock } from 'mockjs'
export default [
    {
        name: '/ss/aaa',
        method: 'get',
        description: 'aa',
        onMock(opt, query, body) {
            const { pageNum, pageSize } = query
            return mock({
                code: 0,
                data: {
                    pageNum: Number(pageNum) || 1,
                    pageSize: Number(pageSize) || 10,
                    total: 66,
                    'result|10': [
                        {
                            createDate: '@date("yyyy-MM-dd")',
                            title: '@csentence(3, 5)',
                        },
                    ],
                },
                message: '请求提示',
            })
        },
    },
]
