import { mock, Random } from 'mockjs'
export default [
    {
        name: '/mock/list',
        method: 'post',
        description: 'mockList',
        onMock(opt, query, body) {
            let pageNum = body.pageNum || body.page || 1
            let length = body.length || body.pageSize || body.limit || 10
            return mock({
                code: 0,
                data: {
                    pageNum,
                    length,
                    total: 66,
                    [`result|${length}`]: [
                        {
                            'id|+1': (pageNum - 1) * length + 1,
                            uuid: Random.guid(),
                            name: '@cname',
                            date: `@date('yyyy-MM-dd')`,
                            beginTime: '@datetime',
                            endTime: '@datetime',
                            address: '@city()',
                            date: `@date('yyyy-MM-dd')`,
                            time: `@time('HH:mm')`,
                            title: '@csentence(3, 5)',
                            'no|100000-10000000': 100000,
                            avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
                            'status|1': ['normal', 'enable', 'disable'],
                            'hasChildren|1': [true, false],
                            [`children|${3}`]: [
                                {
                                    'id|+1': (pageNum - 1) * length + 1 + 100,
                                    uuid: Random.guid(),
                                    name: '@cname',
                                    date: `@date('yyyy-MM-dd')`,
                                    beginTime: '@datetime',
                                    endTime: '@datetime',
                                    address: '@city()',
                                },
                            ],
                        },
                    ],
                },
                message: '请求提示',
            })
        },
    },
]
